<template>
  <div>
    <file-selector
      id="drop"
      accept-extensions=".jpg,.svg,.png"
      :multiple="false"
      :max-file-size="20 * 1024 * 1024"
      @validated="handleFilesValidated"
      @changed="handleFilesChanged"
    >
      {{message}}
    </file-selector>
    <button v-on:click="doUpload" v-if="file">Upload image</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UploadFileToS3',
  data() {
    return {
      message: 'Click here for file selection',
      file: null
    }
  },
  methods: {
    handleFilesValidated(result) {
      if (result === true) {
        console.log('File is valid.');
      } else {
        console.error('File is not valid.')
        this.file = null;
        this.message = 'Try again, file is not valid.'
      }
    },
 
    handleFilesChanged(files) {
      this.message = 'Selected file is: "' + files[0].name + '" Click again to change selection.';
      this.file = files[0];
    },

    doUpload() {
      let formData = new FormData();
      formData.append('file', this.file);

      let url = 'http://34.89.29.183:8080/v1/files/upload';

      axios
        .post(
          url, 
          formData, 
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(() => {
          console.log('Upload is finished')
          this.file = null;
          this.message = 'Upload successful. Click here again for another try.'
        })
    }
  },
  
}
</script>

<style scoped>
#drop:hover {
  cursor: pointer;
}
</style>