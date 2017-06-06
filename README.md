# Election Results

### Dependancies
`npm install` to install dependancies
  - zingchart
  - JSON-loader
  - Booststap
  - Webpack

## Summary & Assumptions
Going into this challenge, I did not have much prior experience with JS charting libraries or data visualizations. As well as manipulating large, and deeply nested JSON data objects. My approach was to first familiarize myself with both of those concepts before I began coding anything related to manipulating the data.
I made the assumption that the dashboard needed to run locally without making any requests to any external resoures/servers. So I added the data files locally, as well as intalled all packges with npm.
Once all the setup was done my goal was to parse th JSON and creat JS objects to insert into the zingcharts map chart. I chose a map chart to visualize the data because with the time give I thought it to be the best way to consume the data most effectively.
On the map the winning candidate would be displayed with the total number of votes they got as well as the party they belonged to in a tooltip that hovers over the map.

The current map in place does not display the data, I stuggled a bit trying to render the data from the data.js file, and to try to iterate through with a loop through the tooltips object of zingchart so that I didn't have to hardcode the data into it.



## Features and Future additions

With more time things I would implement are:

1. Render the 3 maps with the Election data.
2. Display winner on hover with tooltip for all cycles
3. Create a graph that shows which states voted differently by party the following cycle
4. Show how many more or less people voted per cycle
5. Show relationship and variations of political parties for each cycle
