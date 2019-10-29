<template>
    <div id="app">
        <div id="nav">
        </div>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
 #app {
    
   background: #76b852;
   background: -webkit-linear-gradient(right, #9cc938, #6fa1c2);
   background: -moz-linear-gradient(right, #9cc938, #6fa1c2);
   background: -o-linear-gradient(right, #9cc938, #6fa1c2);
   background: linear-gradient(to left, #9cc938, #6fa1c2);
   font-family: "Roboto", sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
 }
 body {
    background: -webkit-linear-gradient(right, #9cc938, #6fa1c2);
}
/* // Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) { 
    @import url(https://fonts.googleapis.com/css?family=Roboto:300);
    #lastgame, #bet, #ourNavBar{
      width:100%;
    }
 }

/* // Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
    @import url(https://fonts.googleapis.com/css?family=Roboto:300);
       #lastgame, #bet{
      width:100%;
    }
}

/* // Large devices (desktops, 992px and up) */
@media (min-width: 992px) { 
    @import url(https://fonts.googleapis.com/css?family=Roboto:300);
       #lastgame, #bet{
      width:80%;

    }
 }

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { 
    @import url(https://fonts.googleapis.com/css?family=Roboto:300);
    #lastgame, #bet{
        width:80%;
        margin: 30px auto;
        padding:10px 0 0 0;
    }
    #generalStandings{
        width:60%;
        margin: 30px auto;
        padding:10px 0 0 0;

    }
 }
</style>