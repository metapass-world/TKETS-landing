import React from 'react'
import { Bar, BarConfig } from '@ant-design/charts';
import { ComparisonData } from './types';

function PriceComparisonChart(props: {comparisonData: ComparisonData[], showPayoutGraph: boolean}) {

  const { comparisonData, showPayoutGraph } = props
  var data = [];
  var minimumPayoutVal = comparisonData.length === 0 ? 0 : comparisonData[0].data.payout;

  for (const ticketSite of comparisonData) {
    if (showPayoutGraph) {
      data.push({type: ticketSite.name, value: ticketSite.data.payout})
      if (ticketSite.data.payout < minimumPayoutVal) {
        minimumPayoutVal = ticketSite.data.payout
      }
    } else {
      var totalCosts = 0
      for (const costKey of Object.keys(ticketSite.data.costs)) {
        totalCosts += ticketSite.data.costs[costKey].value
      }
      data.push({type: ticketSite.name, value: totalCosts})
    }
  }

  var TKETScolor = 'l(0) 0:#57b6eb 1:#e92ba1';
  var generic = 'l(0) 0:#d5d5d5 1:#9c9c9c';
  var config = {
    data: data,
    yField: 'type',
    xField: 'value',
    seriesField: '',
    color: function color(_ref: any) {
      var type = _ref.type;
      if (type === 'Metapass') {
        return TKETScolor;
      }
      return generic;
    },
    label: {
      position: showPayoutGraph ? 'middle' : 'right',
      content: function content(originData: any) {
        var val = parseFloat(originData.value);
        return '$' + (val).toFixed(2);
      },
      style:{
        fontWeight: 700,
      }
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
      grid: null,
      minLimit: showPayoutGraph ? Math.floor(0.95 * minimumPayoutVal / 50) * 50 : 0
    },
    barStyle: {
      radius: [20, 20, 0, 0],
    },
    tooltip: {
      fields: ['none']
    },
  } as BarConfig;
  return <Bar {...config} />;
};

export default PriceComparisonChart