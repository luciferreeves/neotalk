export const mutationObserver = (id: string, callbackFunction: Function) => {
    // wait for partials to load and then run callback function
    const mutationObserver = new MutationObserver(function () {
        if (document.getElementById(id)) {
            callbackFunction();
            mutationObserver.disconnect();
        }
    });
    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });
}
