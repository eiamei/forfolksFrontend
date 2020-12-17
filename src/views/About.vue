<template>
  <div class="about">
    <article class="about-contacts">
      <h1 class="about__header">Контакты</h1>
      <a href="mailto:hello@weareforfolks.com" class="about__mail">hello@weareforfolks.com</a>
      <p>+7 (999) 239-66-10</p>
      <h4>Шоурум</h4>
      <p>Санкт-Петербург, 13-линия В.О., д. 72, "Артмуза", 3 этаж пом. 312</p>
      <h4>График работы ({{dateDecorator(mondayDate)}}-{{dateDecorator(sundayDate)}})</h4>
      <p>Каждую неделю мы немного меняем наш график, пожалуйста, следите за ним на нашем сайте или в instagram</p>
      <ul class="about__timetable">
        <li v-for="time in timetable" :key="time.name">{{time.name}}: {{time.time}}</li>
      </ul>
      <nav class="about-contacts__links">
        <a href="https://vk.com/weareforfolks" target="_blank">
          <img class="about-contacts__link" src="../assets/svg/vk-logo.svg" alt="vk"/>
        </a>
        <a href="https://instagram.com/weareforfolks" target="_blank">
          <img class="about-contacts__link" src="../assets/svg/instagram-logo.svg" alt="instagram"/>
        </a>
        <a href="https://facebook.com/weareforfolks" target="_blank">
          <img class="about-contacts__link" src="../assets/svg/facebook-logo.svg" alt="instagram"/>
        </a>
      </nav>
    </article>
    <article class="about-write-us">
      <h1 class="about__header">Напишите нам</h1>
      <p>Если у вас есть вопросы или комментарии о наших продуктах, пожалуйста, напишите нам.</p>
      <p>Также, если вы хотели бы быть представленными в нашем магазине или просто заинтересованы в сотрудничестве - смело пишите нам на почту <a href="mailto:join@weareforfolks.com" class="about__mail">join@weareforfolks.com</a> или в любой мессенджер. Мы всегда вам рады. </p>
    </article>
  </div>
</template>

<script type="ts">
  import Vue from 'vue';
  export default Vue.extend({
    name: 'aboutPage',
    data () {
      return {
        timetable: {}
      }
    },
    async created () {
      try {
        const result = await fetch('/timetable.json');
        this.timetable = await result.json() || [];
      } catch (e) {
        this.timetable = []
      }
    },
    computed: {
      mondayDate () {
        const current = new Date();
        const currentDay = current.getDay();
        const diff = current.getDate() - currentDay + (currentDay == 0 ? -6:1); // adjust when day is sunday
        return new Date(current.setDate(diff));
      },
      sundayDate () {
        const monday = new Date(this.mondayDate);
        return new Date(monday.setDate(monday.getDate() + 6));
      },
    },
    methods: {
      dateDecorator (date) {
        let day = String(date.getDate());
        let month = String(date.getMonth() + 1);
        function dateToTwoNumber (dt) {
          if (dt.length === 1) {
            return `0${dt}`;
          }
          return dt;
        }
        return `${dateToTwoNumber(day)}.${dateToTwoNumber(month)}`;
      }
    }
  });
</script>

<style>
  .about {
    display: flex;
    flex-wrap: wrap;
    margin: 3rem 1rem;
    max-width: 80rem;
    align-self: center;
  }
  .about__header {
    font-weight: 300;
  }
  .about__mail {
    text-decoration: none;
    color: black;
  }
  .about__timetable {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .about__timetable li {
    margin: 0 0 0.25rem 0;
  }
  .about__instagram, .about__vk, .about__facebook {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 0 8px;
  }
  .about__store {
    margin: 1rem 0 0 0;
  }
  .about__address {
    margin: 8px 0 0 0;
  }
  .about-contacts, .about-partners, .about-write-us {
    margin: 0 2rem 0 0;
    min-width: 30%;
    max-width: 36rem;
  }
  .about-contacts__links {
    display: flex;
    padding: 1rem 0 0 0;
  }
  .about-contacts__link {
    width: 4rem;
    height: 4rem;
    padding: 0 2rem 0 0;
  }
  .about-contacts__link:hover {
    transform: scale(1.1);
  }
</style>