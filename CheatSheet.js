// NEW API
var sketch = require('sketch');
var document = sketch.getSelectedDocument();
var selection = document.selectedLayers;
var layerSelected = selection.layers[0];
var style = layerSelected.style;
var borders = style.borders;
 
 
// overrideTextinSymbolandOverrides : Change text in layers recurcively
function overrideTextinSymbolandOverrides(object) {
  if (object.type == 'Text') {
    // if the object is a text layer, change it
    object.text = "Override!"
  } else if (object.overrides) {
    // If the object is a symbol with text overrides, change them
    for (b = 0; b < object.overrides.length; b++) {
      // Override layer name: object.overrides[b].affectedLayer.name
      if (bject.overrides[b].affectedLayer.type == 'Text')
        object.setOverrideValue(object.overrides[b], "Override!")
    }
  } else if (object.layers.length) {
    // if the object is a group, do this for each of the layers
    object.layers.forEach(overrideTextinSymbolandOverrides)
  }
}
document.pages.forEach(overrideTextinSymbolandOverrides)
 
 
// Get stuff from api via a network request
function networkRequest(url) {
    var task = NSTask.alloc().init();
    task.setLaunchPath("/usr/bin/curl");
    task.setArguments([url]);
    var outputPipe = [NSPipe pipe];
    [task setStandardOutput:outputPipe];
    task.launch();
    var responseData = [[outputPipe fileHandleForReading] readDataToEndOfFile];
    var responseString = [[[NSString alloc] initWithData:responseData encoding:NSUTF8StringEncoding]];
    var parsed = tryParseJSON(responseString);
    if(!parsed) {
      log(responseString);
      throw "Error communicating with server"
    }
    return parsed;
  }
   
  function tryParseJSON (jsonString){
    try {
      var o = JSON.parse(jsonString);
      if (o && typeof o === "object" && o !== null) {
        return o;
      }
    }
    catch (e) { }
    return false;
  }
   
  networkRequest("https://spreadsheets.google.com/feeds/list/1GAa-mnYzZOjk03IUo80JgEZHAgVHeMDrd5VJUz86o_s/od6/public/values?alt=json")
 
 
 
 
// change text styles:
const sketch = require('sketch');
var Shape = sketch.Shape;
var Rectangle = require('sketch/dom').Rectangle
var Text = require('sketch/dom').Text
 
  const document = sketch.getSelectedDocument();
  const page = document.selectedPage;
 
 
const largeFont = 100;
const smallFont = 6;
const amstart = 1;
const amfin = 50;
 
 // var rect = new Rectangle(10, 10, 100,100);
  var text = [];
 
for (i=amstart;i<=amfin;i++)
{
text[i] = new Text({
  text: i.toString(),
style: {fontSize:Math.round(largeFont-((i/amfin) * (largeFont-smallFont)))},
  alignment: Text.Alignment.center,
 parent: page,
    frame: new Rectangle(-(100 * i), Math.round(i/20) * 100, -(100*i)- 100,(Math.round(i/10) * 100 + 100)),
 
})
text[i].adjustToFit()
}
