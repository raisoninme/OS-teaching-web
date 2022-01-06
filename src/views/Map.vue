<template>
    <div>
        <head-top></head-top>
        <div style="margin: 20px 150px 0 40px">
            <div class="addMap" v-show="this.role!='学生'">
                <input
                type="file"
                accept="jpg,png,gif"
                @change="changeImage()"
                ref="avatarInput"
                style="display:none"
                >
                <div class="pic_list_box">
                <!-- <div class="pic_list" v-show="imgDatas.length">
                    <div v-for="(src,index) in imgDatas" :key="index">
                    利用element-ui的图片预览插件
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="src"
                            :preview-src-list="imgDatas">
                        </el-image>
                    </div>
                </div> -->
                <!-- 替换自己的上传图标 -->
                <img class="upload_btn" @click="upLoad" src="../assets/img/upload.png" alt />
                <span style="float:inline-start; vertical-align: middle;font-size:25px">点击左边图标上传</span> 
                </div>   
            </div>
            <div class="map">
                <div class="demo-image__lazy">
                <el-image v-for="url in urls"
                :key="url" 
                :src="url" lazy
                :preview-src-list="srcList"
                :fit="fit"
                style="width: 1000px">
                <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
                </el-image>
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
import headTop from '../components/HeadTop'
export default {
    components: {
        headTop
    },
    data() {
        return {
            imgDatas: [],
            fit:"fill",
            role:this.$globalData.roleArr[this.$globalData.role],
            urls: [
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
            ],
            srcList: [
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
            ]
        }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      changeImage() {
        // 上传图片事件
        var files = this.$refs.avatarInput.files;
        var that = this;
        function readAndPreview(file) {        
            //Make sure `file.name` matches our extensions criteria
            if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
            var reader = new FileReader();
            reader.onload = function(e) {
                // 防止重复上传
                if (that.imgDatas.indexOf(e.target.result) === -1) {
                that.imgDatas.push(e.target.result);
                }
            };
            reader.readAsDataURL(file);
            }
        }
        readAndPreview(files[0])
        if (files.length === 0) {
            return;
        }      
        // 文件上传服务器
        // this.setUploadFile(files[0])       
      },
      setUploadFile(file) {
        this.formData = new FormData()
        this.formData.append('files', file, file.name) // 添加到请求体
        // this.$http
        //     .post('/api/dxbase/upload?resType=EVENT', this.formData)
        //     .then(res=> {
        //     console.log(res);
        //     })
        console.log('upLoad');
        },
      upLoad() {
        // 触发上传图片按钮
        this.$refs.avatarInput.dispatchEvent(new MouseEvent("click"));
        }
    }
}
</script>

<style scoped>
.addMap {
    margin-bottom: 10px;
}
.upload_btn {
  width: 100px;
  height: 80px;
  padding-left: 15px;
  opacity: 70%;
}
.upload_btn:hover {
    cursor:pointer;
}
.pic_list {
  display: flex;
}
</style>