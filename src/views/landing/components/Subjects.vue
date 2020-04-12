<template>
  <div class="landing-subjects">
    <article class="landing-subject" v-for="(subject, index) in subjects">
      <img :class="imageStyles(index)" :src="subject.img"/>
      <div :class="textStyles(index)">
        <h2 class="serif-heading">{{$t(subject.heading)}}</h2>
        <p class="regular-sans-text">{{$t(subject.text)}}</p>
        <div class="regular-link">
          <a :href="subject.href">{{$t(subject.link)}}</a>
          <div></div>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    interface subject {
        heading: string,
        text: string,
        link: string,
        href: string,
        img: string
    }

    interface subjects {
        subjects: Array<subject>
    }

    export default Vue.extend({
        name: 'Subjects',
        data (): subjects {
            return {
                subjects: [{
                    heading: 'landing.subjects.concreteHeader',
                    text: 'landing.subjects.concreteText',
                    link: 'landing.subjects.concreteLink',
                    href: '/store/material/concrete',
                    img: require('../../../assets/images/landing/landing-main-horizontal.jpg')
                }, {
                    heading: 'landing.subjects.dryFlowerHeader',
                    text: 'landing.subjects.dryFlowerText',
                    link: 'landing.subjects.dryFlowerLink',
                    href: '/store/material/concrete',
                    img: require('../../../assets/images/landing/landing-main-horizontal.jpg')
                }, {
                    heading: 'landing.subjects.cottonHeader',
                    text: 'landing.subjects.cottonText',
                    link: 'landing.subjects.cottonLink',
                    href: '/store/material/concrete',
                    img: require('../../../assets/images/landing/landing-main-horizontal.jpg')
                }]
            };
        },
        methods: {
            imageStyles (index: number): Array<string> {
                return [
                    'landing-subject__image',
                    index % 2 === 0 ? 'landing-subject__image--left' : 'landing-subject__image--right'
                ]
            },
            textStyles (index: number): Array<string> {
                return [
                    'landing-subject__text-wrapper',
                    index % 2 === 0 ? 'landing-subject__text-wrapper--right' : 'landing-subject__text-wrapper--left'
                ]
            }
        }
    });
</script>

<style lang="scss">
  @import "src/assets/styles/ui";
  @import "../../../assets/styles/vars";
  .landing-subjects {
    margin-top: 4.5rem;
    padding: 2rem 0;
    background-color: $soft-yellow-background;
  }
  .landing-subject {
    display: flex;
    padding: 2.5rem 0;
    @media screen and (max-width: $tablet) {
      flex-direction: column;
    }
    &__image {
      width: calc(50% - 5rem);
      margin: 0 2rem;
      object-fit: cover;
      @media screen and (max-width: $tablet) {
        width: calc(100% - 5rem);
      }
      &--left {
        @media screen and (min-width: $tablet) {
          margin-right: 0;
          order: 0;
        }
      }
      &--right {
        @media screen and (min-width: $tablet) {
          margin-left: 0;
          order: 1;
        }
      }
    }
    &__text-wrapper {
      margin: 0 2rem;
      @media screen and (min-width: $tablet) {
        margin: 0 6rem;
      }
      &--left {
        @media screen and (min-width: $tablet) {
          margin-right: 6rem;
          order: 0;
        }
      }
      &--right {
        @media screen and (min-width: $tablet) {
          margin-left: 6rem;
          order: 1;
        }
      }
    }
  }
</style>