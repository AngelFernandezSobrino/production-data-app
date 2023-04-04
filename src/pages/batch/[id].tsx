import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/src/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

import React from 'react';
import Box from '@mui/material/Box';
import router, { useRouter } from 'next/router';

import ChartData from '@/src/services/chartData';

import cloneDeep from 'lodash/cloneDeep';

import { useTheme } from '@mui/material/styles';

import { useEffect, useState } from "react";

export default function BatchRender(props: { batch: BatchRenderData }) {

  const [Chart, setChart] = useState<any>();

  let batch = props.batch;
  const theme = useTheme();
  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  function downloadBatchData() {
    window.open(`/api/batch/${batch.batchId}`, '_blank');
  }

  let baseOptions: ApexOptions = {
    chart: {
      type: 'line',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      },
      animations: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
    },
    stroke: {
      curve: 'stepline',
      width: 2
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: false,
      followCursor: true,
      intersect: false,
      marker: {
        show: false
      },

    }
  }

  let motorsChartOptions = cloneDeep(baseOptions);
  let temperatureChartOptions = cloneDeep(baseOptions);
  let weightChartOptions = cloneDeep(baseOptions);
  let pressureChartOptions = cloneDeep(baseOptions);

  motorsChartOptions.title = { text: 'Velocidades', align: 'left' };
  motorsChartOptions.yaxis = {
    labels: {
      formatter: function (val: number) {
        return (val).toFixed(2);
      },
    },
    title: {
      text: 'RPM'
    }
  }
  temperatureChartOptions.title = { text: 'Temperatura', align: 'left' };
  temperatureChartOptions.yaxis = {
    labels: {
      formatter: function (val: number) {
        return (val).toFixed(2);
      },
    },
    title: {
      text: 'ºC'
    }
  }
  weightChartOptions.title = { text: 'Peso', align: 'left' };
  weightChartOptions.yaxis = {
    labels: {
      formatter: function (val: number) {
        return (val).toFixed(2);
      },
    },
    title: {
      text: 'kg'
    }
  }
  pressureChartOptions.title = { text: 'Vacío', align: 'left' };
  pressureChartOptions.yaxis = {
    labels: {
      formatter: function (val: number) {
        return (val).toFixed(2);
      },
    },
    title: {
      text: 'mmHg'
    }
  }

  let motorsChartData;
  let temperatureChartData;
  let weightChartData;
  let pressureChartData;

  if (batch.data) {
    const chartDataParser = new ChartData(batch.data);

    motorsChartData = chartDataParser.getSeries(['AgitadorApi.CurrentSpeed', 'TurbinaApi.CurrentSpeed', 'TurrexApi.CurrentSpeed']);
    temperatureChartData = chartDataParser.getSeries(['Temperature']);
    weightChartData = chartDataParser.getSeries(['WeightApi.Gross']);
    pressureChartData = chartDataParser.getSeries(['Pressure']);
  }

  const boxStyle = {
    borderRadius: '16px',
    borderColor: theme.palette.primary.main,
    borderWidth: '4px',
    padding: '10px',
    margin: '10px'
  }

  return (
    <Box sx={{ width: '100%', overflow: 'auto', flexGrow: '1', display: 'flex', flexDirection: 'column' }}>
      <Box sx={boxStyle}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box>
            <Typography component="h1"> Numero de lote </Typography>
            <Typography component="h1"> {batch.batchId} </Typography>
          </Box>
          <Box>
            <Typography component="h1"> Fecha de fabricación </Typography>
            <Typography component="h1"> {batch.initialTime} </Typography>
          </Box>
          <Box>
            <Typography component="h1"> Peso final del lote </Typography>
            <Typography component="h1"> {batch.mass ? batch.mass : '2450 kg'} </Typography>
          </Box>
          <Box>
            <Typography component="h1"> Tiempo de fabricación </Typography>
            <Typography component="h1"> {batch.totalTime ? batch.totalTime : '02 h 35 min'} </Typography>
          </Box >
        </Box >
      </Box >
      <Box>
        <Button onClick={() => router.push('/')}>Volver</Button>
        {/* Button to download the batch data */}
        <Button onClick={() => {downloadBatchData()}}>Descargar datos</Button>
        </Box>
      <Box sx={{flexShrink: 1, overflow: 'auto'}}>
      {(() => {
        if (Chart && batch.data) {
          return (<>
            <Box sx={boxStyle}>
              <Chart options={motorsChartOptions} series={motorsChartData} height={350} />
            </Box>
            <Box sx={boxStyle}>
              <Chart options={temperatureChartOptions} series={temperatureChartData} height={350} />
            </Box>
            <Box sx={boxStyle}>
              <Chart options={weightChartOptions} series={weightChartData} height={350} />
            </Box>
            <Box sx={boxStyle}>
              <Chart options={pressureChartOptions} series={pressureChartData} height={350} />
            </Box>
          </>)
        }
      })()}
      </Box>
    </Box >
  )
}


import { Batch, BatchRenderData } from '../../models/batch';
import { Button, Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { ThemeContext } from '@emotion/react';

export async function getServerSideProps(context: any) {

  const batch = new Batch();

  await batch.connect();

  let renderBatch = await batch.getRenderBatchById(context.query.id);

  return {
    props: {
      batch: renderBatch
    }
  }
}