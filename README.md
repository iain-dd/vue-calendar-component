# calendar-component

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

I have added multiple features that can dynamically be configured to allow for a better demo.  In 
actual use, all the properties would be set by the developer and left alone depending on the use 
case of the date selector.

Features that have been added: 

1 The ability to switch between Sunday and Monday being the first day of the week. Most people 
believe that Sunday is the first day of the week when displaying a calendar in the fashion but those 
who I have met that disagree are extremely adamant about it. 

2 The ability to only allow for future or past dates to be selected. If this were to be used for a 
workflow where a user is required to enter a date in the future or the past, it is important to not 
allow them to select a date that falls outside of the required date range. 

3 The ability to customize the colors that are used in the calendar.  For a company like Clubspot 
where the product is being configured for different clients with their styles, this feature would 
enable the calendar to blend in more with the rest of the site as opposed to using a plug-in which 
would stand out much more.

3.1  This feature, along with all the others, is not to be dynamically configured in normal use 
there is no validation on the color theme input field. Please stick to the RGB(1-255,1-255,1-255) 
format
