document.addEventListener("DOMContentLoaded", () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const hotelId = urlParams.get("hotelId");

  const displayChosenHotelInfo = document.querySelector(".bookingMainSection");


  firebase
    .database()
    .ref("listings")
    .child(hotelId)
    .once("value", (snapshot) => {
      const response = snapshot.val();
      const oneNightPrice = response.FormOneNightPrice;

      displayChosenHotelInfo.innerHTML = `
    <div class="bookingWindow">
        <input type="hidden" id="selectedHotelId" name="hotelId">
            <div class="bookingWindowLeft">
                <div class="displayChosenHotelImg">
                    <img id="chosenHotelImg" src="${response.FormUploadedImage}" alt="chosenHotelImg">
                </div>
                <div class="chosenHotelDetails">
                    <div class="chosenHotelDetailsTop">
                        <h3>${response.FormHotelName}</h3>
                        <span><i class="fa-solid fa-location-dot fa-lg" style="color: #004021;"></i>  ${response.FormHotelLocation}, ${response.FormHotelAddress}</span>
                    </div>
                    <div class="chosenHotelDetailsTopBottom">
                        <p class="bio"> • ${response.FormHotelBio}</p>
                        <span><i class="fa-solid fa-user fa-sm" style="color: #FFF;"></i>  ${response.FormContactName}</span>
                        <div>
                            <span><i class="fa-solid fa-envelope fa-sm" style="color: #ffffff;"></i>  ${response.FormContactEmail}</span>
                            <span><i class="fa-solid fa-phone fa-sm" style="color: #ffffff;"></i>  ${response.FormContactNumber}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bookingWindowRight">
                <div class="bookingWindowRightTop">
                    <div class="chosenHotelPrices flexCenter">
                        <h3>How long are you planning to stay at ${response.FormHotelName}?</h3>
                        <div class="setPriceList">
                            <div>
                                <div>
                                    <label for="oneNightPrice" class="oneNightPriceLabel pricesLabel">1 day:</label>
                                    <span id="oneNightPrice" class="prices" style="color: #FFF;">${response.FormOneNightPrice} &#8382;</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label for="oneWeekPrice" class="oneWeekPriceLabel pricesLabel">7 days:</label>
                                    <span id="oneWeekPrice" class="prices" style="color: #FFF;">${response.FormOneWeekPrice} &#8382;</span>
                                </div>
                            </div>
                            <div>  
                                <div>
                                    <label for="oneMonthPrice" class="oneMonthPriceLabel pricesLabel">30 days:</label>
                                    <span id="oneMonthPrice" class="prices" style="color: #FFF;">${response.FormOneMonthPrice} &#8382;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="amountOfNights flexCenter">
                        <div>
                            <label for="inputDesiredDays" class="inputDesiredDaysLabel">Amount of nights:</label>
                            <input id="inputDesiredDays" type="number" placeholder="For example: 7">
                        </div>
                        <div>
                            <label for="priceOutput" class="priceOutputLabel">Total:</label>
                            <span id="priceOutput"> &#8382;</span>
                        </div>
                    </div>
                </div>
                <div class="bookingWindowSplitter flexCenter">
                    <h3>Choose payment method</h3>
                </div>
                <div class="bookingWindowRightBottom">
                    <div class="bog cursorHover">
                        <img id="bogIcon" src="./assets/images/bog_fin-01.png" alt="bog">
                    </div>
                    <div class="tbc cursorHover">
                        <img id="tbcIcon" src="./assets/images/tbc-share-image.jpg" alt="tbc">
                    </div>
                </div>
            </div>
    </div>
`;
        const inputDesiredDays = document.querySelector("#inputDesiredDays");
        const priceOutput = document.querySelector("#priceOutput");
        inputDesiredDays.addEventListener("input", () => {
        const desiredDays = inputDesiredDays.value;
        const totalPrice = desiredDays * oneNightPrice;
        priceOutput.textContent = totalPrice + " " + "₾";

        const bogIcon = document.querySelector("#bogIcon");
        const tbcIcon = document.querySelector("#tbcIcon");

        bogIcon.addEventListener("click", () => {
            const url = new URL("./paymentBOG.html", window.location.href);
            url.searchParams.set("totalPrice", totalPrice);
            window.location.href = url.href;
          });

        tbcIcon.addEventListener("click", () => {
        const url = new URL("./paymentTBC.html", window.location.href);
        url.searchParams.append("totalPrice", totalPrice);
        window.location.href = url.href;
        });
    });
  });
});


