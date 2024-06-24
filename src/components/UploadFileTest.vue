<template>
    <div>
        <input type="file" @change="onFileChange">
        <button @click="uploadFile">Upload</button>
        <div v-if="fileUrl">File URL: {{ fileUrl }}</div>
        <img style="width: 100px;" :src="fileUrl"/>
    </div>
</template>

<script>
import axios from 'axios';
import userService from "@/services/userService";
import apiClient from "@/utils/apiClient";

export default {
    data() {
        return {
            selectedFile: null,
            fileUrl: ''
        }
    },
    methods: {
        onFileChange(event) {
            this.selectedFile = event.target.files[0];
        },
        async uploadFile() {
            if (this.selectedFile) {
                const formData = new FormData();
                formData.append('file', this.selectedFile);
                const token = userService.getCurrentUser();
                console.log(token);
                try {
                    const response = await apiClient.post('/api/file/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            // 'Authorization': 'Bearer ' + token
                        }
                    });
                    console.log(response);
                    this.fileUrl = response.data;
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        }
    }
}
</script>