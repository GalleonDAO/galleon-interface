const { colors } = require("../../../src/styles/colors");
const { DoubloonToken, ETH } = require("../../../src/constants/tokens");

const {
  getPriceImpactColorCoding,
  getPriceImpact,
  formattedBalance,
  getFormattedOuputTokenAmount,
  formattedFiat,
  getFormattedPriceImpact,
  getHasInsufficientFunds,
  getTransactionAmount,
  getReceivedAmount,
} = require("../../../src/components/trading/modules/QuickTradeFormatter");

const { displayFromWei } = require("../../../src/utils");
jest.mock("../../../src/utils");
jest.mock("../../../src/components/trading/modules/QuickTradeFormatter");

describe("getPriceImpactColorCoding", () => {
  test("Price Impact below lower limit -- returns copper", () => {
    const expectedColor = colors.themeCopper;
    const result = getPriceImpactColorCoding(-10, false);
    expect(result).toBe(expectedColor);
  });
  test("Price Impact below upper limit -- returns navy", () => {
    const expectedColor = colors.themeNavy;
    const result = getPriceImpactColorCoding(-4, false);
    expect(result).toBe(expectedColor);
  });
  test("Price Impact above upper limit -- returns navy", () => {
    const expectedColor = colors.themeNavy;
    const result = getPriceImpactColorCoding(1, false);
    expect(result).toBe(expectedColor);
  });
});

describe("getPriceImpact", () => {
  test("input token amount <= 0 -- returns null", () => {
    const result = getPriceImpact(-1, 1, 1, 1);
    expect(result).toBeNull();
  });
  test("output token amount <= 0 -- returns null", () => {
    const result = getPriceImpact(1, 1, -1, 1);
    expect(result).toBeNull();
  });
  test("Happy Path -- returns price impact", () => {
    const expectedResult = ((100 - 200) / 100) * -100;
    const result = getPriceImpact(1, 100, 1, 200);
    expect(result).toBe(expectedResult);
  });
});

describe("formattedBalance", () => {
  const token = DoubloonToken;
  test("token balance IS undefined -- returns 0.00", () => {
    const result = formattedBalance(token);
    expect(result).toBe("0.00");
  });
  test("token balance IS defined -- returns value from wei 2dp", () => {
    const result = formattedBalance(token, 1000);
    expect(result).toBe("1000");
  });
  //TODO: missing undefined displayFromWei case
});

describe("getFormattedOuputTokenAmount", () => {
  describe("IS Exchange Issuance", () => {
    const isEI = true;
    test("EI output amount IS undefined -- returns 0.0", () => {
      const result = getFormattedOuputTokenAmount(isEI, 2);
      expect(result).toBe("0.0");
    });
    describe("EI output amount IS NOT undefined", () => {
      test("displayFromWei returns null -- returns 0.0", () => {
        displayFromWei.mockImplementation(() => null);
        const result = getFormattedOuputTokenAmount(isEI, 2, undefined, 10);
        expect(result).toBe("0.0");
      });
      test("displayFromWei returns value -- returns value", () => {
        displayFromWei.mockImplementation(() => "null");
        const result = getFormattedOuputTokenAmount(isEI, 2, undefined, 10);
        expect(result).toBe("10.0");
      });
    });
  });
  describe("IS NOT Exchange Issuance", () => {
    const isEI = false;
    test("trade output amount IS undefined -- returns 0.0", () => {
      const result = getFormattedOuputTokenAmount(isEI, 2);
      expect(result).toBe("0.0");
    });
    describe("trade output amount IS NOT undefined", () => {
      test("displayFromWei returns null -- returns 0.0", () => {
        displayFromWei.mockImplementation(() => null);
        const result = getFormattedOuputTokenAmount(isEI, 2, 10, undefined);
        expect(result).toBe("0.0");
      });
      test("displayFromWei returns value -- returns value", () => {
        displayFromWei.mockImplementation(() => "null");
        const result = getFormattedOuputTokenAmount(isEI, 2, 10, undefined);
        expect(result).toBe("10.0");
      });
    });
  });
});

describe("formattedFiat", () => {
  test("token amount IS undefined -- returns 0.00", () => {
    const result = formattedFiat(undefined, 10);
    expect(result).toBe("0.0");
  }); //TODO: Not implemented, confirm with Davy
  test("token price IS undefined -- returns 0.00", () => {
    const result = formattedFiat(1, undefined);
    expect(result).toBe("0.0");
  }); //TODO: Not implemented, confirm with Davy
  test("Happy Path -- returns (tokenAmount * tokenPrice) AS (US) string", () => {
    const expectedResult = "$10";
    const result = formattedFiat(1, 10);
    expect(result).toBe(expectedResult);
  });
});

//TODO: this method lacks a lot of null handling
describe("getFormattedPriceImpact", () => {
  test("priceImpact IS undefined -- returns null", () => {
    getPriceImpact.mockImplementation(() => undefined);
    const result = getFormattedPriceImpact(1, 10, 1, 10);
    expect(result).toBe(null);
  });
  test("priceImpact IS NOT undefined -- returns {priceImpact: (priceImpact TO 2DP), colorCoding: (colorCoding)}", () => {
    getPriceImpact.mockImplementation(() => 1.01234);
    getPriceImpactColorCoding.mockImplementation(() => colors.themeNavy);

    const expectedResult = {
      priceImpact: "(1.01$)",
      colorCoding: colors.themeNavy,
    };
    const result = getFormattedPriceImpact(1, 10, 1, 10);

    expect(result).toBe(expectedResult);
  });
});

//TODO: this name breaks boolean convention, should assume the positive and confirm the negative
describe("getHasInsufficientFunds", () => {
  describe("Input checks", () => {
    test("bestOptionUnavailable IS TRUE -- returns false", () => {
      const result = getHasInsufficientFunds(true, 1, 10);
      expect(result).toBe(false);
    });
    test("sellAmount IS (Zero) -- returns false", () => {
      const result = getHasInsufficientFunds(false, 0, 10);
      expect(result).toBe(false);
    });
    test("sellAmount IS (Negative) -- returns false", () => {
      const result = getHasInsufficientFunds(false, -1, 10);
      expect(result).toBe(false);
    });
    test("sellTokenBalance IS undefined -- returns false", () => {
      const result = getHasInsufficientFunds(false, 1, undefined);
      expect(result).toBe(false);
    });
  });
  describe("Happy Path", () => {
    test("sellTokenAmount > sellTokenBalance -- returns true", () => {
      const result = getHasInsufficientFunds(false, 10, 1);
      expect(result).toBe(true);
    });
    test("sellTokenAmount <= sellTokenBalance -- returns false", () => {
      const result = getHasInsufficientFunds(false, 1, 10);
      expect(result).toBe(false);
    });
  });
});

//TODO: SUGGESTED REFACTOR
describe("hasSufficientFunds", () => {
  describe("Input checks", () => {
    //TODO: should invalid inputs yield sufficient funds?
    test("bestOptionUnavailable IS TRUE -- returns true", () => {});
    test("sellAmount IS (Zero) -- returns true", () => {});
    test("sellAmount IS (Negative) -- returns true", () => {});
    test("sellTokenBalance IS undefined -- returns true", () => {});
  });
  describe("Happy Path", () => {
    test("sellTokenAmount > sellTokenBalance -- returns false", () => {});
    test("sellTokenAmount <= sellTokenBalance -- returns true", () => {});
  });
});

//TODO: Missing null check on symbol
describe("getTransactionAmount", () => {
  test("IS buying -- returns maximum payment", () => {
    const expectedResult = "Maximum ETH Payment";
    const result = getTransactionAmount(true, DoubloonToken, ETH);
    expect(result).toBe(expectedResult);
  });
  test("IS NOT buying -- returns minimum received payment", () => {
    const expectedResult = "Minimum DBL Received";
    const result = getTransactionAmount(false, DoubloonToken, ETH);
    expect(result).toBe(expectedResult);
  });
});

//TODO: Missing null check on symbol
describe("getReceivedAmount", () => {
  test("IS buying -- returns exact received", () => {
    const expectedResult = "Exact DBL Received";
    const result = getReceivedAmount(true, DoubloonToken, ETH);
    expect(result).toBe(expectedResult);
  });
  test("IS NOT buying -- returns exact paid", () => {
    const expectedResult = "Exact ETH Paid";
    const result = getReceivedAmount(false, DoubloonToken, ETH);
    expect(result).toBe(expectedResult);
  });
});

describe("getTradeInfoData0x", () => {
  describe("Input checks", () => {
    test("zeroExTradeData IS undefined -- returns[]", () => {});
    test("zeroExTradeData IS null -- returns[]", () => {});
    describe("zeroExTradeData Values", () => {
      test("gasPrice IS undefined -- returns []", () => {});
      test("gas IS undefined -- returns []", () => {});
      test("sources IS undefined -- returns []", () => {});
    });
  });

  //TODO: this method is handling too much, should be split
  describe("buyAmount", () => {
    test("displayFromWei returns undefined -- returns Buy amount as 0.0", () => {});
    test("displayFromWei returns value -- returns Buy amount as value", () => {});
  });
  describe("minReceive", () => {
    test("displayFromWei returns undefined -- returns min receive as 0.0", () => {});
    test("displayFromWei returns value -- returns min receive as value", () => {});
  });
  describe("networkFeeDisplay", () => {
    test("networkFee IS undefined -- returns network feee as -", () => {});
    test("networkFee IS NOT undefined -- returns network fee TO 4DP", () => {});
  });
  describe("networkToken", () => {
    test("chainId IS ChainId.Polygon -- returns networkToken as MATIC", () => {});
    test("chainId IS NOT ChainId.Polygon -- returns networkToken as ETH", () => {});
  });
  describe("offerFromSources", () => {
    test("0 valid sources -- returns ??", () => {}); //No coverage for this case
    test("1 valid source -- returns valid source", () => {});
    test("many valid sources -- returns valid sources", () => {});
  });
});

describe("getTradeInfoDataFromEI", () => {
  describe("Input checks", () => {
    describe("data", () => {
      test("data IS undefined -- returns[]", () => {});
      test("data IS null -- returns[]", () => {});
    });
    describe("exactSetAmount", () => {
      test("displayFromWei returns undefined -- returns 0.0", () => {});
      test("displayFromWei returns value -- returns value", () => {});
    });
    describe("maxPayment", () => {
      test("displayFromWei returns undefined -- returns 0.0", () => {});
      test("displayFromWei returns value -- returns value", () => {});
    });
    describe("networkFeeDisplay", () => {
      test("networkFee IS undefined -- returns network feee as -", () => {});
      test("networkFee IS NOT undefined -- returns network fee TO 4DP", () => {});
    });
    describe("networkToken", () => {
      test("chainId IS ChainId.Polygon -- returns networkToken as MATIC", () => {});
      test("chainId IS NOT ChainId.Polygon -- returns networkToken as ETH", () => {});
    });
    test('offeredFrom -- returns "Galleon - Exchange Issuance"');
  });

  //TODO: this method is handling too much, should be split
  describe("buyAmount", () => {
    test("displayFromWei returns undefined -- returns Buy amount as 0.0", () => {});
    test("displayFromWei returns value -- returns Buy amount as value", () => {});
  });
  describe("minReceive", () => {
    test("displayFromWei returns undefined -- returns min receive as 0.0", () => {});
    test("displayFromWei returns value -- returns min receive as value", () => {});
  });
  describe("networkFee", () => {
    test("displayFromWei returns value -- returns min networkFee as value", () => {});
  });
  describe("networkFeeDisplay", () => {
    test("displayFromWei returns undefined -- returns network feee as -", () => {});
    test("displayFromWei returns value -- returns network fee TO 4DP", () => {});
  });
  describe("networkToken", () => {
    test("chainId IS ChainId.Polygon -- returns networkToken as MATIC", () => {});
    test("chainId IS NOT ChainId.Polygon -- returns networkToken as ETH", () => {});
  });
  describe("offerFromSources", () => {
    test("0 valid sources -- returns ??", () => {}); //No coverage for this case
    test("1 valid source -- returns valid source", () => {});
    test("many valid sources -- returns valid sources", () => {});
  });
});
