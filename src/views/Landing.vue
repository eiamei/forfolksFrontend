<template>
  <main style="font-family: 'Playfair Display', serif;">
    <landing-slideshow/>
    <article style="display: flex; flex-direction: column; align-items: center;">
      <h1 style=" font-size: 40px; font-weight: bold">Дизайн для современной жизни</h1>
      <p>Мы - молодая студия из Питера. Интерьер и декор наша страсть, которой мы хотим заразить всех вокруг. Настало время отбросить стереотипы и сделать свой дом в стиле лучших постов из Instagram и Pinterest.</p>
    </article>
    <article style="display: flex; flex-direction: column; align-items: center; margin-top: 48px">
      <section style="display: flex; max-width: 1200px">
        <img style="width: calc(50% - 62px); margin-right: 62px;" src="../assets/images/store/landing_concrete.jpg"/>
        <div style="display: flex; flex-direction: column; justify-content: center; width: calc(50% - 62px); margin-left: 62px;">
          <h2>Бетон</h2>
          <p>Мы - молодая студия из Питера. Интерьер и декор наша страсть, которой мы хотим заразить всех вокруг. Настало время отбросить стереотипы и сделать свой дом в стиле лучших постов из Instagram и Pinterest.</p>
          <router-link to="store/all">В магазин</router-link>
        </div>
      </section>
      <section style="display: flex; max-width: 1200px">
        <div style="display: flex; flex-direction: column; justify-content: center; width: calc(50% - 62px); margin-left: 62px;">
          <h2>Бетон</h2>
          <p>Мы - молодая студия из Питера. Интерьер и декор наша страсть, которой мы хотим заразить всех вокруг. Настало время отбросить стереотипы и сделать свой дом в стиле лучших постов из Instagram и Pinterest.</p>
          <router-link to="store/all">В магазин</router-link>
        </div>
        <img style="width: calc(50% - 62px); margin-right: 62px;" src="../assets/images/store/landing_concrete.jpg"/>
      </section>
      <section style="display: flex; max-width: 1200px">
        <img style="width: calc(50% - 62px); margin-right: 62px;" src="../assets/images/store/landing_concrete.jpg"/>
        <div style="display: flex; flex-direction: column; justify-content: center; width: calc(50% - 62px); margin-left: 62px;">
          <h2>Бетон</h2>
          <p>Мы - молодая студия из Питера. Интерьер и декор наша страсть, которой мы хотим заразить всех вокруг. Настало время отбросить стереотипы и сделать свой дом в стиле лучших постов из Instagram и Pinterest.</p>
          <router-link to="store/all">В магазин</router-link>
        </div>
      </section>
      <section style="display: flex; max-width: 1200px">
        <div style="display: flex; flex-direction: column; justify-content: center; width: calc(50% - 62px); margin-left: 62px;">
          <h2>Бетон</h2>
          <p>Мы - молодая студия из Питера. Интерьер и декор наша страсть, которой мы хотим заразить всех вокруг. Настало время отбросить стереотипы и сделать свой дом в стиле лучших постов из Instagram и Pinterest.</p>
          <router-link to="store/all">В магазин</router-link>
        </div>
        <img style="width: calc(50% - 62px); margin-right: 62px;" src="../assets/images/store/landing_concrete.jpg"/>
      </section>
    </article>
    <section></section>
  </main>
</template>

<script>
import LandingSlideshow from '../components/LandingSlideshow';
export default {
  name: 'Landing',
  components: {LandingSlideshow},
  data () {
    return {

    }
  }
};
</script>

<style scoped>

</style>