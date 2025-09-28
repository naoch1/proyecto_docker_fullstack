const getSuspender = (promise) => {
    let status = "pending";
    let response;

    const suspender = promise.then(
        (res) => {
            status = "success";
            response = res;
            console.log("Promesa resuelta con éxito:", res); // Mensaje de éxito
        },
        (err) => {
            status = "error";
            response = err;
            console.log("Error Promesa:", err); // Mensaje de éxito
        }
    );

    const read = () => {
        switch (status) {
            case "pending":
                console.log("Lanzando suspender (promesa pendiente)");
                throw suspender;
            case "error":

                console.log("Lanzando error...")

                throw response;
            default:
                console.log("Devolviendo respuesta");
                return response;
        }
    };

    return { read };
};


export function fetchData(url) {
    console.log("Iniciando solicitud fetch a:", url);
    const promise = fetch(url)
        .then((response) => {
            console.log("Respuesta fetch recibida:", response);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((json) => {
            console.log("JSON parseado:", json);
            return json;
        })
        .catch((error) => {
            console.error("Error en fetchData:", error);
            //Aquí se puede agregar lógica adicional para manejar el error.
            //por ejemplo mostrar un mensaje al usuario.
            throw error;
        });

    return getSuspender(promise);
}
