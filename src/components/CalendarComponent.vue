<template>

    <label>Select Date:</label>
    <div  class="clickable-box" @click="openCalendar(selectedDate)">
        <div class="box-content">
            {{selectedDate}}
        </div>
    </div>

    
    
   
    <div  id="calendar" v-if="calendarOpen" style="position: fixed; z-index: 99999; background-color: white;">
    <!--sunday calendar-->
        <table class="table-borderless border border-1 border-gray shadow" v-if="sundayStart && !displayMonthSelect">
        <thead>
            <tr >
                <th colspan="7"> 
                    <button class="float-end btn btn-sm danger"  @click="closeCalendar()">
                        <font-awesome-icon icon="xmark" />
                    </button>
                </th>
            </tr>
            <tr style="border-bottom: 4px !important; border-color: black;">           
                <th class="text-center " colspan="7" v-for="month in months.filter(x=> x.value ==month)" :key="month.value">                
                    <font-awesome-icon id="prev" icon="angle-left" class="float-start btn btn-sm" @click="prevMonth()" />
                    <span id="month-and-year" @click="monthView()" >{{ month.text }}, {{ year }}</span>        
                    <font-awesome-icon id="next" icon="angle-right" class="float-end btn btn-sm" @click="nextMonth()" />
                </th>
            </tr>
            <tr class="text-center days-of-week">
            <th v-for="day in daysOfWeekSunday" :key="day.value">{{day.text}}</th>
            </tr>         
        </thead>
        <tbody>
            <tr class="text-center" v-for="i in 6" :key="i">
                <td  v-for="day in daysOfWeekSunday" :key="day.value">
                    <div id="dayTd"
                        @click="selectDay(((i-1)*7) + day.value - firstDayOfMonth +1 )" 
                        v-if="((i-1)*7) + day.value - firstDayOfMonth +1 > 0 && 
                        ((i-1)*7) + day.value - firstDayOfMonth +1 < numberOfDays +1"
                        class="btn btn-sm text-center"
                        :class="{
                            'selected' : new Date(year,month,((i-1)*7) + day.value - firstDayOfMonth + 1).toString() == activeDay.toString() ,                     
                            'disable' : (new Date(year,month,((i-1)*7) + day.value - firstDayOfMonth + 2) < new Date()  && futureOnly) || (new Date(year,month,((i-1)*7) + day.value - firstDayOfMonth + 1) > new Date()  && pastOnly),
                            'weekend': (day.value ==0 || day.value ==6)  && highlightWeekend
                        }"
                        
                        > 
                        {{((i-1)*7) + day.value - firstDayOfMonth + 1}}
                    </div>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th class="text-center" colspan="7" v-if="selectedDateInRange">
                    <button class="btn btn-outline-primary btn-sm" @click="updateDate()">
                    Select
                    </button>
                </th>
            </tr>
        </tfoot>
        </table>
        <!--monday calendar-->
        <table class="table-borderless border border-1 border-gray shadow" v-if="!sundayStart && !displayMonthSelect">
        <thead >
            <!--close-->
            <tr>
                <th colspan="7"> 
                    <button class="float-end btn btn-sm danger"  @click="closeCalendar()">
                        <font-awesome-icon icon="xmark" />
                    </button>
                </th>
            </tr>
            <!--month and navagation-->
            <tr >           
                <th class="text-center " colspan="7" v-for="month in months.filter(x=> x.value ==month)" :key="month.value">
                    <font-awesome-icon id="prev" icon="angle-left" class="float-start btn btn-sm" @click="prevMonth()" />
                    <span id="month-and-year" @click="monthView()">{{ month.text }}, {{ year }}</span>
                    <font-awesome-icon id="next" icon="angle-right" class="float-end btn btn-sm" @click="nextMonth()" />
                </th>
            </tr>
            <!--days of week-->
            <tr class="text-center days-of-week" >
            <th  v-for="day in daysOfWeekMonday" :key="day.value">{{day.text}}</th>
            </tr>     
        </thead>
        <tbody>
            <tr class="text-center" v-for="i in 6" :key="i">
                <td  v-for="day in daysOfWeekMonday" :key="day.value">
                    <div id="dayTd"
                        @click="selectDay(((i-1)*7) + day.value - firstDayOfMonth +1 )" 
                        v-if="((i-1)*7) + day.value - firstDayOfMonth +1 > 0 && 
                        ((i-1)*7) + day.value - firstDayOfMonth +1 < numberOfDays +1"
                        class="btn btn-sm  text-center"
                        :class="{
                            'selected' : new Date(year,month,((i-1)*7) + day.value - firstDayOfMonth + 1).toString() == activeDay.toString() ,                     
                            'disable' : (new Date(year,month,((i-1)*7) + day.value - firstDayOfMonth + 2) < new Date()  && futureOnly) || (new Date(year,month,((i-1)*7) + day.value - firstDayOfMonth + 1) > new Date()  && pastOnly),
                            'weekend': (day.value ==5 || day.value ==6)  && highlightWeekend
                        }"
                        > 
                        {{((i-1)*7) + day.value - firstDayOfMonth + 1}}
                    </div>
                </td>
            </tr>
            
        </tbody>
        <tfoot>
            <tr>
                <th class="text-center" colspan="7" v-if="selectedDateInRange">
                    <button class="btn btn-outline-primary btn-sm" @click="updateDate()">
                    Select
                    </button>
                </th>
            </tr>
        </tfoot>
        </table>
        <!--month calendar-->
        <table class="table-borderless border border-1 border-gray shadow" v-if="displayMonthSelect">
        <thead >
            <!--close-->
            <tr>
                <th colspan="3"> 
                    <button class="float-end btn btn-sm close"  @click="closeCalendar()">
                        <font-awesome-icon icon="xmark" />
                    </button>
                </th>
            </tr>
            <!--year and navagation-->
            <tr >           
                <th class="text-center " colspan="3" v-for="month in months.filter(x=> x.value ==month)" :key="month.value">        
                    <font-awesome-icon id="prev" icon="angle-left" class="float-start btn btn-sm" @click="this.year = this.year - 1" />
                    {{ year }}
                    <font-awesome-icon id="next" icon="angle-right" class="float-end btn btn-sm" @click="this.year = this.year + 1" />
                </th>
            </tr>         
        </thead>
        <tbody>
            <tr class="text-center" v-for="i in 4" :key="i">
                <td id="monthTd" v-for="j in 3" :key="j">
                    <div @click="selectMonth((i-1)*3 +j-1)">                    
                        {{ months.find(x=> x.value == (i-1)*3 +j-1).textShort }}                  
                    </div>
                </td>
            </tr>        
        </tbody>
        </table>

    </div>
  
</template>

<script>
    import moment from "moment";

    export default {
        
        name:"calendar",
        props: ["sundayStart","futureOnly","pastOnly","highlightWeekend","themeColor"],

        data(){
            return{
                displayMonthSelect:false,
                selectedDateInRange:false,
                calendarOpen: false,
                selectedDate: null,
                daysOfWeekSunday:[
                    {value:0, text:"Su"},
                    {value:1, text:"Mo"},
                    {value:2, text:"Tu"},
                    {value:3, text:"We"},
                    {value:4, text:"Th"},
                    {value:5, text:"Fr"},
                    {value:6, text:"Sa"},
                ],
                daysOfWeekMonday:[
                    {value:0, text:"Mo"},
                    {value:1, text:"Tu"},
                    {value:2, text:"We"},
                    {value:3, text:"Th"},
                    {value:4, text:"Fr"},
                    {value:5, text:"Sa"},
                    {value:6, text:"Su"},

                ],
                months: [
                    { value: 0, text: "January", days:31, textShort:"Jan" },
                    { value: 1, text: "February", days:28, textShort:"Feb" },
                    { value: 2, text: "March" , days:31, textShort:"Mar"},
                    { value: 3, text: "April", days:30, textShort:"Apr" },
                    { value: 4, text: "May", days:31, textShort:"May" },
                    { value: 5, text: "June", days:30, textShort:"Jun" },
                    { value: 6, text: "July" , days:31, textShort:"Jul"},
                    { value: 7, text: "August", days:31, textShort:"Aug" },
                    { value: 8, text: "September", days:30, textShort:"Sep" },
                    { value: 9, text: "October", days:31, textShort:"Oct"},
                    { value: 10, text: "November", days:30, textShort:"Nov"},
                    { value: 11, text: "December", days:31, textShort:"Dec" }
                ],
                month:null,
                year: null,
                isLeapYear:false,
                firstDayOfMonth: null,
                count: 1,
                numberOfDays:null,
                newDate:null,
                selectedDay: null,
                activeDay:null,
                now:null,

            }
        

        },
        watch:{
            "futureOnly": function(newValue){
                if(this.activeDay.getTime() < new Date().getTime()){
                    this.activeDay = new Date(this.thisYear,this.thisMonth,this.thisDay)               
                    this.newDate = moment().format("MM/DD/YYYY")                  
                }
                this.hideSelectButton();
            },

            "pastOnly": function(newValue){
                if(this.activeDay.getTime() > new Date().getTime()){
                    this.activeDay = new Date(this.thisYear,this.thisMonth,this.thisDay)               
                    this.newDate = moment().format("MM/DD/YYYY")                  
                }
                this.hideSelectButton();            
            },
            "sundayStart": function(newValue){
                this.firstDayOfMonth = new Date(this.year, this.month,1).getDay();
                this.getFirstDayPosition()

            },
            "themeColor": function(newValue){
                this.setThemeColor()
            }
        },
        methods:{           
            selectMonth(month){
                this.month = month
                this.displayMonthSelect = false;
                this.getFirstDayPosition()
                this.getDaysInMonth();
            },
            monthView(){
                this.displayMonthSelect = true;
            },
            openCalendar() {
                this.calendarOpen = true
            },

            closeCalendar(){
                this.calendarOpen = false
            },

            getDaysInMonth(){
                if(this.month == 1 && this.leapYear(this.year)){
                    this.numberOfDays = this.months.find(x=> x.value == this.month).days + 1
                }
                else{
                    this.numberOfDays = this.months.find(x=> x.value == this.month).days
                }
            },
            
            
            hideSelectButton(){
                if(this.activeDay.getMonth() == this.month && this.activeDay.getFullYear() == this.year){
                    this.selectedDateInRange = true;
                }else{
                    this.selectedDateInRange = false;
                }
            },
           
            
            selectDay(day){
                this.selectedDateInRange = true;
                this.selectedDay = day
                this.activeDay = new Date(this.year,this.month,day)
                this.newDate = new moment([this.year, this.month, day]).format("MM/DD/YYYY")
            },
            updateDate(){
                this.selectedDate = this.newDate;
                this.calendarOpen = false
                this.selectedDateInRange = false;
            },            

            prevMonth(){               
                if(this.month != 0){
                    this.month --
                }
                else{
                    this.month = 11
                    this.year --
                }
                this.count = 1;
                this.getFirstDayPosition()
                this.getDaysInMonth();
                this.hideSelectButton();
            },
            nextMonth(){
                if(this.month != 11){
                    this.month ++
                }
                else{
                    this.month = 0
                    this.year ++
                }                            
                this.count = 1;
                this.getFirstDayPosition()
                this.getDaysInMonth();
                this.hideSelectButton();
            },
            getFirstDayPosition(){
                this.firstDayOfMonth = new Date(this.year, this.month,1).getDay();
              
                if(!this.sundayStart && this.firstDayOfMonth!=0){
                    this.firstDayOfMonth --
                }else if(!this.sundayStart){
                    this.firstDayOfMonth = 6
                }

            },
            leapYear: function(year){
                return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
            },
            setThemeColor(){
                document.querySelector(':root').style.setProperty('--themeColor', this.themeColor);
            }
        },
 
        mounted(){
            this.setThemeColor()
            this.now = moment().format("MM/DD/YYYY");        
            this.selectedDate = this.now
            this.thisYear= parseInt(moment().format("YYYY"));
            this.thisMonth=parseInt(moment().format("MM"))-1;
            this.thisDay= parseInt(moment().format("DD"))
            this.year = parseInt(moment().format("YYYY"));
            this.month =parseInt(moment().format("MM"))-1;
            this.selectedDay = parseInt(moment().format("DD"))
            this.activeDay = new Date(this.year,this.month,this.selectedDay)
            this.getFirstDayPosition()
            this.getDaysInMonth();    
        }
    }
</script>

<style>

:root {
  --themeColor: rgb(255,154,25);
}

table{
    width: 246px;
}

#dayTd:hover, #monthTd:hover {   
    background-color: rgb(248, 246, 246);
    border-radius: 6px ;
}
.fa-xmark:hover{
    color: red;
}
.btn-outline-primary{
    --bs-btn-color: var(--themeColor) !important;
    --bs-btn-border-color: var(--themeColor)!important;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: var(--themeColor) !important;
    --bs-btn-hover-border-color: var(--themeColor) !important;
    --bs-btn-focus-shadow-rgb: 13, 110, 253;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: var(--themeColor) !important;
    --bs-btn-active-border-color: var(--themeColor) !important;
    --bs-btn-active-shadow: inset 0 3px 5px

}
#prev:hover, #next:hover, #month-and-year:hover{
    color: var(--themeColor) ;
    background-color: rgb(248, 246, 246);
    border-radius: 6px !important;
    cursor: pointer;
}
.selected{
    color: var(--themeColor) !important;
}
.disable
{
    background-color: rgb(199, 199, 199) !important;
    pointer-events: none ;
    cursor: default ;
    width: 32px;
    height: 32px;
    
}
.weekend
{
    background-color: rgba(199, 199, 199, 0.466) !important;
}
.days-of-week{
    color: var(--themeColor)
}
#monthTd{
    height: 32px;
}
#dayTd{
    width: 32px;
    height: 32px;
}
.clickable-box {
  width: 200px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease; 
  border: 1px solid darkgray;
  border-radius: 6px;
}
.clickable-box:hover {
    background-color: rgb(248, 246, 246);
}
</style>