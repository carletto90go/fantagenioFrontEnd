<template>
    <div id="login">
        <div class="text-center">
            <b-alert variant="danger"  label="Text Centered" :show="input.showAlert">USERNAME O PASSWORD ERRATI!!!</b-alert>
            <b-alert variant="danger"  label="Text Centered" :show="input.showAlertGenerico">ERRORE CONNESSIONE! CONTATTA HELPDESK</b-alert>
        </div>
        <div class="form" >
            <b-form>       
            <b-img class="img" center src="../assets/logoCompleto.jpg" fluid alt="Responsive image"></b-img>    
            <b-input type="text" size="lg" name="username" v-model="input.username" placeholder="Inserisci username"></b-input>

            <b-input type="password" name="password" size="lg" v-model="input.password" placeholder="Inserisci password"></b-input>

            <b-button  v-if="!input.spinner" type="submit" size="lg" v-on:click="login()">Accedi</b-button>
            </b-form>
        </div>
        <div class="text-center" v-if="input.spinner">
            <b-spinner variant="light" label="Text Centered"></b-spinner>
        </div>
    </div>
</template>

<script>
  export default {
        name: 'login',
        data() {
            return {
                input: {
                    username: "",
                    password: "",
                    output: "",
                    showAlert: false,
                    spinner: false,
                    showAlertGenerico: false,
                }
            }
        },

        mounted() {
            if(localStorage.getItem("jwt"))
                this.$router.push({ name : "ourNavBar" });
        },
        methods: {

            login() {
                this.input.showAlert = false;
                this.input.showAlertGenerico = false;
                if(this.input.username != "" && this.input.password != "") {
                    let object = this;
                    this.input.spinner = true;
                    this.visible = true
                    this.axios.post( process.env.VUE_APP_ENVIRONMENT_SECRET + "login",
                    {
                        "request":{
                            username: this.input.username,
                            password: this.input.password
                        }
                    })

                    .then( response => {
                        localStorage.setItem("username", response.data.response.username);
                        localStorage.setItem("jwt", response.data.response.jwt);
                        localStorage.setItem("leagueId", 1);
                        this.$router.push({ name: "ourNavBar" });
                    })
                    .catch( function (error) {
                        if(error.response.status == 403) object.input.showAlert = true;
                        else object.input.showAlertGenerico = true;
                        object.input.spinner = false;
                    });
                } else {
                  this.input.showAlertGenerico = true; //    console.log("The username and / or password is incorrect");
                    }
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