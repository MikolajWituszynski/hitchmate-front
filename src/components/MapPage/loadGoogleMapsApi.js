const loadGoogleMapsApi = (apiKey) => {
    return new Promise((resolve, reject) => {
        if(window.google) {
            resolve(window.google);
            return;
        }

        if (document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js?key="]')) {
            return;
          }

          window.initMap = function() {
            resolve(window.google);
        }
        
        // create script element
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
        script.async = true;
        script.defer = true;

        //Resolve the Promise when the script is loaded successfully
        script.onload = () => {
            resolve(window.google);
        };

        //Reject the Promise if the script fails to load
        script.onerror = () => {
            reject(new Error('Failed to load Google Maps API script'))
        };

        document.head.appendChild(script);
    })
}

export default loadGoogleMapsApi;