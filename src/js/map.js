let map
// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    //this should be setup by the user preferences?
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru,
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      minZoom: 0,

    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });

    map.addListener("click", mapClickEvent);
    map.addListener("dblclick", mapDoubleClickEvent)
}
function registerCustomIcons() {
  //TODO
}

/**
 * This is the base control for how the user iteracts with the map
 * @author Caedin Cook
 * @param {google.maps.MapMouseEvent | google.maps.IconMouseEvent} e 
 */
function mapClickEvent(e) {
  
}
/**
 * @author Caedin Cook
 * @param {google.maps.MapMouseEvent } e 
 */
function mapDoubleClickEvent(e) {
  //TODO
}