// This file helps to stringify the user object and serializes bigint to string

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json
function replacer(key, value) {
    if (key === "userid" || key === "privillegeid") {
        return value.toString();
    }
    return value;
}

module.exports.stringifyUser = (user) => {
    return JSON.stringify(user, replacer);
};
