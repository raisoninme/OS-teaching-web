<template>
  <div style="margin-left: 40px; margin-right: 40px">
        <p style="font-size:14px">请在此输入你的问题或上传图片：</p>
        <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入问题"
        v-model="textarea">
        </el-input>
        <!-- updata the link to the server (action='') -->
        <!-- <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleChange"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
            -->
        <div style="margin-top:15px"><el-button type="primary" @click="submitUpload">点击发送提问</el-button></div>
        <div style="margin-top:15px" v-if="isUp==true">
            <div style="font-size:13px;margin-bottom:10px">
                <p>您的问题：</p>
                {{textarea}}
            </div>
            <el-divider content-position="left" v-if="relist.length==0">已发送问题给老师，请耐心等待</el-divider> 
            <div class="reblock" v-for="(re,index) in relist" :key="index" v-else>
                <span style="font:13px; margin-top:10px">{{re.name}}</span>
                <span>&nbsp;回复:</span>
                <p>{{re.content}}</p>
            </div>  
        </div> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            isUp: false,
            textarea: '',
            // 从后台获取
            relist:[{
                name:'老师',
                content: '这你都不会？？'
            }],
            // fileList: [{
            //     name: 'food.jpeg',
            //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            //     }, {
            //     name: 'food2.jpeg',
            //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            //     }],
        }
    },
    methods: {
        submitUpload() {
            // if(this.fileList.length!=0&&!(this.textarea=='' || this.textarea.replace(/(^\s*)|(\s*$)/g, "")=="")){
            //     //upload the text to the server
            //     this.$refs.upload.submit();
            // }else if(!(this.textarea=='' || this.textarea.replace(/(^\s*)|(\s*$)/g, "")=="")){
            //     //upload to the server
            // }else if(this.fileList.length!=0){
            //     this.$refs.upload.submit();
            // }else{
            //     flag=false;
            //     this.$message({
            //     message: 'please enter your question in the textarea or just upload the image',
            //     });
            // }
            var flag=true;
            if(this.textarea=='' || this.textarea.replace(/(^\s*)|(\s*$)/g, "")==""){
                flag=false;
            }
            if(flag){
                this.isUp=true;
                this.$message({
                    message: '已成功提交问题给老师!',
                    type: 'success'
                    });
            }   
        },
    }
}
</script>

<style>

</style>