<script>

import { Line } from 'vue-chartjs'

export default {
    props: ['info'],
    data() {
        return {
            graphData: null
        }
    },
    extends: Line,
    mounted() {
        this.graphData = this.info
    },
    methods: {
        newGraph() {
            this.renderChart({
                labels: this.graphData.dates,
                datasets: [
                    {
                        label: `${this.$t('general.visitsOnPage')} ` + this.graphData.days + ` ${this.$t('general.days')}`,
                        backgroundColor: '#ecf1f6',
                        data: this.graphData.visitors,
                        borderWidth: 1,
                        borderColor: '#0259ac'
                    }
                ]
            }, {responsive: true, maintainAspectRatio: false})
        }
    },
    watch: {
        info: {
            handler() {
                this.graphData = this.info
                this.newGraph()
            },
            deep: true
        }
    }
}
</script>

<style scoped>

</style>
