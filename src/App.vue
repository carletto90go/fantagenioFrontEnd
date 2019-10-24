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
</style>