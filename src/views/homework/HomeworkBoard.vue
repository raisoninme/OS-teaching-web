<template>
    <div>
        <head-top></head-top>
        <div style="margin: 20px 200px 0 40px">
            <el-tabs :tab-position="tabPosition" style="height: 100%;">
                <el-tab-pane v-for="(item,index) in hwlist" :key="index" :label="item">
                    <!-- 将作业hwlist相应的item值传入子组件 -->
                    <hwAsk v-if="role==='学生'"></hwAsk>
                    <hwRep v-if="role==='老师'"></hwRep>
                </el-tab-pane>
            </el-tabs>
        </div>       
    </div>
</template>

<script>
import headTop from '../../components/HeadTop'
import hwAsk from '../../components/HomeworkAsk.vue'
import hwRep from '../../components/HomeworkRep.vue'
export default {
    components: {
        headTop,
        hwAsk,
        hwRep
    },
    data() {
        return {
            role: this.$globalData.roleArr[this.$globalData.role],
            tabPosition:"left",
            hwlist: [
                '进程调度作业1',
                '进程调度作业2',
            ],
        }
    },
    methods: {
    },
}
</script>

<style>
</style>