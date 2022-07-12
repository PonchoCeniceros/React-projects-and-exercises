/**
 *
 */
const isValidAddress = ip => {
    const pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return pattern.test(ip) === true;
}

/**
 *
 */
const isIpAlready = (ip, devices) => {
    if (devices === []) {
        return false;
    }
    const found = devices.map(device => device.props.ip).find(element => element === ip);
    return found !== undefined;
}

/**
 *
 */
const isNaturalNumber = number => {
    return parseInt(number) > 0;
}

/**
 *
 */
const isSetupDateValid = (start, end) => {
    const startDate = new Date(Date.parse(start));
    const endDate = new Date(Date.parse(end));
    return startDate < endDate;
};

export {
    isValidAddress,
    isIpAlready,
    isNaturalNumber,
    isSetupDateValid,
};
