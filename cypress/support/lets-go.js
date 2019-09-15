const SPEED_TEST_WAIT_TIME = 60 * 1000; // 60s

const beginTests = () => {
    cy.visit('https://www.speedtest.net')
}

const clickGoButton = () => {
    cy.get('.start-button a.js-start-test').click();
}

const shouldHaveDownloadSpeed = () => {
    // wait until it finds the download speed element with number in it
    // timeout after 60s
    cy.get('.result-item-download span.download-speed').contains(/\d/, {
        timeout: SPEED_TEST_WAIT_TIME
    }).should('be.visible');
}

const shouldHavePing = () => {
    cy.get('.result-item-ping span.ping-speed').contains(/\d/, {
        timeout: SPEED_TEST_WAIT_TIME
    }).should('be.visible');
}

const shouldHaveUploadSpeed = () => {
    cy.get('.result-item-upload span.upload-speed').contains(/\d/, {
        timeout: SPEED_TEST_WAIT_TIME
    }).should('be.visible');
}

const rateISP = (rating) => {
    // rate ISP stars by rating number (1 - 5)
    cy.get(`.result-item-isp .rating-container span:nth-child(${rating})`).click();
    // make sure the star color changed after rating
    cy.get('.result-item-isp .rating-container span[data-default="#1cbfff"]').should('have.length', rating);
}

const shouldHaveISP = () => {
    // ISP info should not be empty
    cy.get('.result-item-isp .result-label').should('not.be.empty');
    cy.get('.result-item-isp .result-data').should('not.be.empty');
}

const shouldHaveHost = () => {
    // host URL and address should not be empty
    cy.get('.result-item-host .hostUrl').should('not.be.empty');
    cy.get('.result-item-host .result-data').should('not.be.empty');
}

module.exports = {
    beginTests,
    clickGoButton,
    shouldHaveDownloadSpeed,
    shouldHavePing,
    shouldHaveUploadSpeed,
    rateISP,
    shouldHaveISP,
    shouldHaveHost
}