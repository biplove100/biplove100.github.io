const apiUrl =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
 
  window.onload = function() {
    men();
};

async function fetchData(categoryIndex) {
  try {
    const response = await fetch(apiUrl);
    const x = await response.json();
    const data = x.categories[categoryIndex].category_products;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function men() {
  const data = await fetchData(0);
  console.log(data);
  renderProducts(data);
}

async function women() {
  const data = await fetchData(1);
  renderProducts(data);
}

async function kids() {
  const data = await fetchData(2);
  renderProducts(data);
}

function renderProducts(data) {
  console.log(data);
  if (data) {
    const appContainer = document.querySelector(".card");
    if (appContainer.childElementCount != 0) {
      appContainer.innerHTML = "";
    }
    data.forEach((item) => {
      const cardItem = document.createElement("div");
      cardItem.style.border = `1 solid gray`;
      cardItem.style.padding = `5px`;
      cardItem.style.marginBottom = `15px`;
      var title = item.title;
      if (item.title.length >= 12) title = item.title.substring(0, 12) + "..";
      else title = item.title;

      var badge = item.badge_text;
      if (item.badge_text == null) badge = "";
      else badge = item.badge_text;

      cardItem.innerHTML = `
                  <div style=" position:relative;height: 220px; width: 200px; display: flex; justify-content: center; align-items: center;">
                    <img src="${item.image}" alt="${
        item.name
      }" style="height: 220px; width: 200px ;border-radius:4px" />
                    <h4 style="font-size: 12px; position:absolute;top:10px;background:white;color:black;padding-left:20px;padding-right:20px;padding:6px;left:5px;border-radius:5px">${badge}</h4>
                    </div>
                  <div style="display: flex; align-items: center; gap: 10px;margin-top:10px ">
                    <h4 style="display:flex; flex-wrap: wrap;font-size:14px">${title}</h4>
                    <li style="font-size: 12px;">${item.vendor}</li>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px;margin-top:10px">
                    <h4 style="font-size:12px">Rs ${item.price}.00</h4>
                    <s style="color: gray;font-size:12px">${
                      item.compare_at_price
                    }.00</s>
                    <span style="color: #FF3737;font-size:12px;font-weight: 600;">${
                      Math.round(
                        ((item.compare_at_price - item.price) /
                          item.compare_at_price) *
                          100,
                        2
                      ) + "% Off"
                    }</span>
                  </div>
                  <button style="background-color: black; color: white; width: 100%; padding: 8px;  border-radius: 5px;margin-top:10px">
                    Add to Cart
                  </button>
                `;
      appContainer.appendChild(cardItem);
    });
  }
}
