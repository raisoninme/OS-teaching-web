<template>
    <div>
        <head-top></head-top>
        <div style="margin: 20px 200px 0 40px">
            <el-tabs :tab-position="tabPosition" style="height: 100%;">
                <el-tab-pane v-for="(item,index) in hwlist" :key="index" :label="item">
                    <div style="margin-left: 40px; margin-right: 40px">
                        <p style="font-size:14px">请在此输入你的问题：</p>
                        <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入问题"
                        v-model="textarea">
                        </el-input>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>       
    </div>
</template>

<script>
import headTop from '../../components/HeadTop'
export default {
    components: {
        headTop
    },
    data() {
        return {
            tabPosition:"left",
            hwlist: [
                '进程调度作业1',
                '进程调度作业2',
            ],
            textarea: '',
        }
    },
    methods: {
    },
}
</script>

<style>

</style>