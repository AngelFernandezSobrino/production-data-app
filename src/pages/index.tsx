import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/src/styles/Home.module.css'


import Time from '../time/time';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'batchId' | 'reactorId' | 'initialTime' | 'totalTime' | 'mass';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'batchId', label: 'Identificador', minWidth: 100 },
  { id: 'reactorId', label: 'Reactor', minWidth: 100 },
  {
    id: 'initialTime',
    label: 'Inicio',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'totalTime',
    label: 'Duración',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'mass',
    label: 'Masa (kg)',
    minWidth: 90,
    align: 'center'
  },
];

import React from 'react';
import Box from '@mui/material/Box';
import router from 'next/router';

export default function Home({ batches }: any) {

  console.log(batches);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', flexGrow: '1', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>Production data manager</title>
        <meta name="description" content="Production data access and management app" />
      </Head>
      <Box sx={{ flexGrow: '0', flexShrink: '0' }}>
        <TablePagination sx={{}}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={batches.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Box sx={{ flexGrow: '1', overflow: 'auto', flexShrink: '1' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {batches
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((batch: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={batch.batchId} onClick={() => {
                      router.push(`/batch/${batch.batchId}`)
                    }}>
                      {columns.map((column) => {
                        const value = batch[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box >
  )
}

import { Batch } from '../models/batch';

export async function getServerSideProps() {

  const batch = new Batch();

  await batch.connect();

  let renderBatches = await batch.getRenderBatches();

  return {
    props: {
      batches: renderBatches
    }
  }
}