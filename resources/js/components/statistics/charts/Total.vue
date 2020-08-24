<script>

import { Bar } from 'vue-chartjs'

export default {
    props: ['total'],
    data() {
        return {
            graphData: null
        }
    },
    extends: Bar,
    mounted() {
        this.graphData = this.total
    },
    methods: {
        newGraph() {
            this.renderChart({
                labels: this.graphData.months,
                datasets: [
                    {
                        label: `${this.$t('general.totalPerMonth')}`,
                        backgroundColor: '#ecf1f6',
                        data: this.graphData.priceByMonth,
                        borderWidth: 1,
                        borderColor: '#0259ac'
                    }
                ]
            }, {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function (value) {
                                return value + ' €'
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return Math.round(tooltipItems.yLabel * 100) / 100 + ' €';
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            })
        }
    },
    watch: {
        total: {
            handler() {
                this.graphData = this.total
                this.newGraph()
            },
            deep: true
        }
    }
}
</script>

<style scoped>

</style>
