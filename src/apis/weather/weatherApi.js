
// import API from '../url';
const API_WEATHER = "https://api.openweathermap.org/data/2.5/onecall?";

class Api {

    async getLocationData(data) {
        const conf = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            timeout: 30000,
        }

        function checkStatus(response) {
            if (response.status >= 200 && response.status < 300 || response.status == 422) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }
        function parseJSON(response) {
            return response.json()
        }

        var query = {}

        console.log('url',`${API_WEATHER}lat=${data.lat}&lon=${data.lon}&units=${data.units}&exclude=minutely&appid=b6300e8af9a1e6410ed108a67cedb25e`)
        console.log('conf', conf)
 
        await fetch(`${API_WEATHER}lat=${data.lat}&lon=${data.lon}&units=${data.units}&exclude=minutely&appid=b6300e8af9a1e6410ed108a67cedb25e`, conf)
            .then(checkStatus)
            .then(parseJSON)
            .then(function (data) {
                query = data
            }).catch(function (error) {
                if (error.message == 'Network request failed') {
                    query = {
                        meta: {
                            status: 'ERROR',
                            error: {
                                title: 'Error de conexión',
                                mesagge: 'Por favor revise su conexión a internet y vuelva a intentarlo mas tarde'
                            }
                        }
                    }
                }
                else {
                    query = {
                        meta: {
                            status: 'ERROR',
                            error: {
                                title: 'Ups...',
                                mesagge: 'Por el momento este servicio no esta disponible, vuelva a intentarlo mas tarde,'
                            }
                        }
                    }
                }

                return query

            });
        return query
    }
}

export default new Api();