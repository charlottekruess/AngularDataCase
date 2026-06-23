# Repository

# My approach 
 - Added directories for components, model, and services 
 - Selecting exactly one dataset and one grouping, as well as one or more analytics is presented as toggle button to the user, showing which selectiosn are made and validating the input. 
 - Using Reactive Forms with angular material libary for toggle elements NG VALUE ACCESSOR, custom validation added
 - separated re-usable toggle compoents => could be used as mat-select too if needed later 
 - result table for data display with Angular material, spinner shown while fetching calcualtion data response

## Components: 
 - standalone vs module based 
 - using RxJS and Signals (toSignal for transforming) as in latest Angular conventions 
 - mapping id to display name to lookup corresponding names for data nodes
 - "dumb" vs "smart" components separation of concerns, responsible only for rendering data vs. orchestration of form input and api requests forwarded to relevant service 
 - app component still mostly presentational 

 ## services: 
 - data service for pure api requests 
 - calculate service for orchestrating parallel async requests and returning the merged results 
 - exposes states as signals: loading error rows (API response transformed)
 - in larger apps, would make seervices stateless and compoenents handle more subscription and state logic 
 - could be extended to more functions, as provided in root will allow injection in other compoennts, makes the state a singleton 


# Not required for the given User Requirements and this interation: 
 - no routing/deep linkable routes necessary 
 - no polling/websockets to fetch fresh data while usign the app
 - no frontend filtering since the result already excludes nodes without a valid calculation response

 # TODO for later
 - add sorting, filtering, pagination, add/remove fucntions later
 - consider ARIA libary for screenreaders, accessibility 
 - re-usable toggle compoents => could be used as mat-select too if needed later 
