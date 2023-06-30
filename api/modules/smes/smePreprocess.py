import math 

# term indexes
term_indexes = {
    12 :6.0,
    24 :5.0,
    36 :4.0,
    48 :2.0,
    60 :1.0,
    72 :3.0,
    84 :0.0,
    96 :9.0,
    108 :10.0,
    120 :7.0,
    132 :13.0,
    144 :15.0,
    156 :21.0,
    168 :19.0,
    180 :12.0,
    192 :17.0,
    204 :22.0,
    216 :24.0,
    228 :23.0,
    240 : 8.0,
    252 :14.0,
    264 :16.0,
    276 :18.0,
    288 :20.0,
    300 :11.0
}

#proportions of sectors
propotions = {11: 0.1967766116941529,
 23: 0.5017660995046306,
 31: 0.4480845749469954,
 42: 0.584591275425355,
 44: 0.528719448849035,
 48: 0.5703480257530052,
 51: 0.6577217962760131,
 52: 0.6174151150054764,
 53: 0.6306144728633811,
 54: 0.4214586086747567,
 55: 0.9810549777117384,
 56: 0.47937201730520484,
 61: 0.6427898209236569,
 62: 0.3136723962012401,
 71: 0.6260093497662559,
 72: 0.4505084188525937,
 81: 0.48042333426616113}

# Means of economicial Indicators
mean_ei = {'Year': 2008.5,
 'Unemployment Rate': 5.804166666666666,
 'Consumer Price Index (CPI)': 212.77083333333334,
 'Producer Price Index (PPI)': 185.625,
 'Federal Funds Rate': 2.060833333333333,
 'Industrial Production': 112.29583333333333,
 'Inflation Rate': 2.0791666666666666,
 'Interest Rates': 2.1008333333333336,
 'Recession': 0.2916666666666667,
 'USD Appreciation Rate': 102.14541666666668}

# Standard deviations of economicial Indicators
std_ei = {'Year': 7.0710678118654755,
 'Unemployment Rate': 1.8001157370198915,
 'Consumer Price Index (CPI)': 29.346083053445316,
 'Producer Price Index (PPI)': 24.404690390240116,
 'Federal Funds Rate': 2.132813852059347,
 'Industrial Production': 11.305269228056474,
 'Inflation Rate': 0.9618095114064343,
 'Interest Rates': 2.1470078606337677,
 'Recession': 0.4643056214875365,
 'USD Appreciation Rate': 4.295094248261529}



# means of financial Indicators
mean_cr = {
 'cur_ratio': 2.5232674527605816,
 'debt_capital': 0.6542081703307778,
 'debt_equity': -0.7518495045649659,
 'gross_marging': 41.288706017777876,
 'operating_margin': 5.6322185015204465,
 'ebit_margin': 5.6686468103434855,
 'ebitda_margin': 14.128607834189726,
 'pre_tax_profit': 2.129253109756801,
 'net_profit_margin': 0.7185523043703455,
 'asset_turnover': 0.8347837715197299,
 'roe': 7.4276937633125035,
 'rote': 22.920978656025255,
 'roa': 2.3579732565052303,
 'roi': 3.8753307128252397
}


# Standard deviations of financial Indicators
std_cr = {
 'cur_ratio': 3.757520090771712,
 'debt_capital': 4.220094436680934,
 'debt_equity': 46.19061302299281,
 'gross_marging': 23.25311365315656,
 'operating_margin': 41.392285445675405,
 'ebit_margin': 41.402792228621365,
 'ebitda_margin': 35.763060078247086,
 'pre_tax_profit': 43.44980901200238,
 'net_profit_margin': 35.8203118273657,
 'asset_turnover': 0.6642708458235539,
 'roe': 291.1420189152791,
 'rote': 394.0506220491681,
 'roa': 12.329500687599547,
 'roi': 28.39019936478605
}



sectorMap = {
"11":	7, "21":	8, "22":	11, "23":	2, "31":	5, "33":	5, "42":	9, "44":	9,
"45":	9, "48":	11, "49":	11, "51":	10, "52":	8, "53":	8, "54":	8, "55":	0,
"56":	0, "61":	11, "62":	4, "71":	8, "72":	7, "81":	8 }


def getbins(sector):
    bins = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    sectors = [11,23,31,42,44,48,51,52,53,54,55,56,61,62,71,72,81]
    bins[sectors.index(sector)] = 1
    return bins


def preprocessSMEData(data):
    ei = [ data["interest_rate"], data["unemployment_rate"], data["prev_cpi"], data["prev_ipr"]]
    preprocessed = [data['term'], data['no_emp']]
    
    # get log loan amount
    log_loan_amount = math.log(data['loan_amount']) 
    preprocessed.append(log_loan_amount)

    # get term bin
    term = data["term"]
    bin_term = (term // 12 + 1) *12
    preprocessed.append(bin_term)

    # get rural or urbun
    preprocessed.append(data['rural'])

    # get sector proportion
    proportion = propotions[data['sector']]
    preprocessed.append(proportion)

    # get sector bins
    bins = getbins(data['sector'])
    preprocessed += bins

    # get term index
    term_index = term_indexes[bin_term]
    preprocessed.append(term_index)

    # add macroeconomical indicators
    preprocessed += ei
    return preprocessed

# function for getting standard scaler
def getScaled(x,mean,std):
    return (x - mean) / std


def getScaledData(data):
    fi = ('cur_ratio' ,'debt_capital',  'debt_equity', 'gross_marging',  'operating_margin', 'ebit_margin',  'ebitda_margin', 'pre_tax_profit', 
            'net_profit_margin', 'asset_turnover',  'roe',  'rote',  'roa',  'roi')
    
    scaled_data = []

    for key,value in data.items():
        if key in fi:
            print(key)
            scaled = getScaled(value, mean_cr[key], std_cr[key])
            scaled_data.append(scaled)

    return scaled_data

# fuction for getting sector bins
def getCrSectorbins(sector):
    bins = [0,0,0,0,0,0,0,0,0,0,0,0]
    bins[sector] = 1
    return bins

# function for preprocessing financial indicators
def preprocessCRData(data):
    preprocessed = []
    
    #  get sector
    sector = sectorMap[str(data["sector"])]
    preprocessed.append(sector)
    
    # get scaled data
    scaled_values = getScaledData(data)
    preprocessed += scaled_values

    # get sector bins
    sector_bins = getCrSectorbins(sector)
    preprocessed += sector_bins

    return preprocessed
