export const buildErrors = (e, fnName, context) => {
    const {
        status,
        data
    } = e.response || {};

    if (e.message.includes('Cannot read property \'accessToken\' of null')) {
        return [
            401,
            {
                type: 'error',
                status: 401,
                message: "Session expired. Please sign in."
            }
        ];
    }

    if (!status) { // BE is down
        return [
            503,
            {
                type: 'error',
                status: 503,
                message: "The application is temporarily unavailable."
            }
        ];
    }

    if (status === 404) {
        return [
            status,
            {
                type: 'error',
                status: e.response.status,
                message: e.response.data?.message
            }
        ];
    }

    if (data && data?.errors) {
        const errors = data.errors;
        errors.map((error) => {
            console.error(error.status, error.statusText, fnName);
            error.type = 'error';
            if (error.hasOwnProperty('messages')) {
                error.message = error.messages;
            }
        });
        return [
            status,
            errors[0]
        ];
    }

    if (data && data?.error) {
        return [
            status,
            {
                type: 'error',
                status: status,
                message: error,
            }
        ];
    }
};

export const handleErrors = async (response) => {
    if (!response.ok) {
        !isWhiteListError(response) && Honeybadger.notify(response.error, {
            context: {
                error: {
                    status: response?.status,
                    statusText: response?.statusText
                },
            },
        });
        if (response?.status === 404) {
            window.location.href = "/404";
        }
        if (response?.status === 503) {
            window.location.href = "/503";
        }
        return response.json().then(Promise.reject.bind(Promise));
    }
    return response.json();
};
