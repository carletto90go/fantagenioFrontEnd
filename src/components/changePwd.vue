<template>
    <div id="changePwd" class="form">
        <b-form>
            <b-img class="img" center src="../assets/logoCompleto.jpg" fluid alt="Responsive image"></b-img>
            <b-input type="text" size="lg" name="username" v-model="username" placeholder="Inserisci username"></b-input>
            <b-input type="password" name="password" size="lg" v-model="oldPassword" placeholder="Vecchia password"></b-input>
            <b-input type="password" name="password" size="lg" v-model="newPassword" placeholder="Nuova password"></b-input>
            <b-input type="password" name="password" size="lg" v-model="newPassword2" placeholder="Ripeti nuova password"></b-input>
            <b-button v-if="!spinner" type="button" size="lg" v-on:click="sendData()">Cambia password</b-button>
            <b-spinner v-if="spinner" variant="success" label="Spinning" ></b-spinner>
            <b-alert v-model="error" variant="danger"  label="Text Centered" :show="error"></b-alert>
        </b-form>
    </div>
</template>

<script>





  export default {
        name: 'changePwd',
        data() {
            return {
                username : null,
                oldPassword : null,
                newPassword : null,
                newPassword2 : null,
                error : null,
                flagError : false,
                spinner : false
                }
            },

        mounted() {
            console.log(process.env.VUE_APP_HASH_SECRET);
            if(!localStorage.getItem("jwt"))
                this.$router.push({ name: "login" });
        },
        methods: {
            sendData(){
                this.spinner = true;
                if(!this.username || !this.oldPassword || !this.newPassword || !this.newPassword2 ) {
                    this.error = "Inserire tutti i dati";
                    this.flagError = true;
                    this.spinner= false;
                    return;
                    }
                if(this.newPassword != this.newPassword2){
                    this.error = "Le password devono coincidere!";
                    this.spinner = false;
                    return;
                    }
                const jwt = localStorage.getItem("jwt");
                const options = {
                                method: 'POST',
                                headers: {
                                    'Access-Control-Allow-Origin' : '*',
                                    'Content-Type': 'application/json',
                                    'auth-token' : jwt
                                    }
                            };
                let requestJson = {
                    request : {
                        username : this.username,
                        oldPassword : this.oldPassword,
                        newPassword : this.newPassword
                    }
                }
                return this.axios.post("https://hidden-ocean-91661.herokuapp.com/api/user/changePwd", requestJson, options)
                .then( response => {
                    console.log(response);
                    console.log(response.status);
                    this.spinner = false;
                    });
                }
                /*
                let hashedPwd = crypt(this.newPassword, process.env.VUE_APP_HASH_SECRET);
                hashedPwd = hashedPwd.toString();
                console.log(hashedPwd);
                let clearPwd = enc(hashedPwd, process.env.VUE_APP_HASH_SECRET);
                clearPwd = clearPwd.toString(CryptoJS.enc.Utf8);
                console.log(clearPwd);
                */
            }
        }
    }
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.label{
  text-align: left;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 5% auto 100px;
  padding: 10px 45px  45px  45px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background:  #023a5b;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #6fa1c2;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
.titolo{
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #023a5b;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 20px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  text-align: center;
}
.img{
  margin: 15px;
  padding: 15px;
}
</style>