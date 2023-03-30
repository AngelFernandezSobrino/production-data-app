

export default class ParseChartData {

    series: { name: string; data: any[] }[] = [];

    constructor(data: any) {
        for (let i = 1; i < data.columns.length; i++) {
            this.series.push({
                name: data.columns[i],
                data: []
            });
        }
        for (let i = 0; i < data.values.length; i++) {
            for (let j = 1; j < data.columns.length; j++) {
                if (data.values[i][j] != null) {
                    this.series[j - 1].data.push([data.values[i][0], data.values[i][j]]);
                }
            }
        }
    }

    getSeries(seriesName: string[]) {
        let outputSeries: { name: string; data: any[] }[] = [];
        if (seriesName.length === 0) {
            return outputSeries;
        }
        for (let i = 0; i < seriesName.length; i++) {
            let serie = this.series.find(x => {
                return x.name === seriesName[i];
            });
            if (serie) outputSeries.push(serie);
        }
        return outputSeries;
    }

}