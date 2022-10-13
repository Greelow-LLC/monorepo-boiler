// import the library
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'

import {
  IconLookup,
  IconDefinition,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core'
library.add(fas);

const trashLookup: IconLookup = { prefix: 'fas', iconName: 'trash' }
const trashIconDefinition: IconDefinition = findIconDefinition(trashLookup)

const userLookup: IconLookup = { prefix: 'fas', iconName: 'user' }
const userIconDefinition: IconDefinition = findIconDefinition(userLookup)

const umbrellaBeachLookup: IconLookup = { prefix: 'fas', iconName: 'umbrella-beach' }
const umbrellaBeachIconDefinition: IconDefinition = findIconDefinition(umbrellaBeachLookup)


export {trashIconDefinition, userIconDefinition,umbrellaBeachIconDefinition}