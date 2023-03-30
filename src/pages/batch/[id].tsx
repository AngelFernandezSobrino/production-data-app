import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/src/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

import React from 'react';
import Box from '@mui/material/Box';
import router, { useRouter } from 'next/router';

import ChartData from '@/src/services/chartData';


import { useEffect, useState } from "react";

export default function BatchRender(props: any) {

  const [Chart, setChart] = useState<any>();

  let id = props.batch.id;

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);


  let options: ApexOptions = {
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
    title: {
      text: 'Stock Price Movement',
      align: 'left'
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return (val).toFixed(2);
        },
      },
      title: {
        text: 'Value'
      },
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
      y: {
        formatter: function (val: number) {
          return (val).toFixed(0)
        }
      }
    }
  }

  let motorsChartData;
  let temperatureChartData;
  let weightChartData;
  let pressureChartData;

  let batch = props.batch;
  if (batch.data) {
    const chartDataParser = new ChartData(batch.data);

    motorsChartData = chartDataParser.getSeries(['AgitadorApi.CurrentSpeed', 'TurbinaApi.CurrentSpeed', 'TurrexApi.CurrentSpeed']);
    temperatureChartData = chartDataParser.getSeries(['Temperature']);
    weightChartData = chartDataParser.getSeries(['WeightApi.Gross']);
    pressureChartData = chartDataParser.getSeries(['Pressure']);
  }


  return (
    <Box sx={{ width: '100%', overflow: 'auto', flexGrow: '1', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>Production data manager</title>
        <meta name="description" content="Production data access and management app" />
      </Head>
      {id}
      <Button variant="contained" onClick={() => router.push('/')}>Volver</Button>
      <div id="chart">
        {(() => {
          if (Chart && batch.data) {
            return (<>
              <Chart options={options} series={motorsChartData} height={350} />
              <Chart options={options} series={temperatureChartData} height={350} />
              <Chart options={options} series={weightChartData} height={350} />
              <Chart options={options} series={pressureChartData} height={350} />
            </>)
          }
        })()}
      </div>
    </Box >
  )
}


import { Batch } from '../../models/batch';
import { Button } from '@mui/material';
import { ApexOptions } from 'apexcharts';

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