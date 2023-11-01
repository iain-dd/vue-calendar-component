<template>


<div class="container" style="height: 500px;">
  <input type="checkbox" id="checkbox1" v-model="sundayStart"/>
  <label for="checkbox1">Sunday first day of week</label><br>
  <input type="checkbox" id="checkbox2" v-model="futureOnly" />
  <label for="checkbox2">Only allow furutre date selections</label><br>
  <input type="checkbox" id="checkbox3" v-model="pastOnly" />
  <label for="checkbox3">Only allow past date selections</label><br>
  <input type="checkbox" id="checkbox4" v-model="highlightWeekend" />
  <label for="checkbox4">Highlight weekend</label><br>
  <label for="color">theme color eg: rgb(1-255,1-255,1-255)</label><br>
  <input id="color" v-model="themeColor" /><br>
  
  <Calendar :futureOnly="futureOnly" :highlightWeekend="highlightWeekend" :pastOnly="pastOnly" :sundayStart="sundayStart" :themeColor="themeColor" />
  <div>something below to show that calendar does not affect the rest of the page</div>

 

</div> 
  

</template>

<script>
import Calendar from './components/CalendarComponent.vue'

export default {
  components:{
    Calendar : Calendar
  },

  data(){
    return{
      sundayStart: true,
      futureOnly: false,
      pastOnly: false,
      highlightWeekend: false,   
      themeColor:'rgb(255,155,25)'
    }
    

  }



}
</script>


<style scoped>

</style>
