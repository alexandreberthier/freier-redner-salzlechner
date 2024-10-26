<template>
  <nav>
    <Navbar/>
  </nav>
  <main>
    <RouterView/>
  </main>
  <footer>
    <Footer/>
  </footer>
  <ScrollButton/>
</template>

<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import ScrollButton from "@/components/ScrollButton.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<style scoped>

nav {
  z-index: 100;
  position: fixed;
  left: 0;
  right: 0;
}

main {
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin: 0 auto 100px auto;
}

</style>