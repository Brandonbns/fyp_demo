from sklearn.preprocessing import LabelEncoder


def bin_fico_scores(df):
    ranges = [0, 580, 670, 740, 800, float('inf')]
    labels = ['Poor', 'Fair', 'Good', 'Very Good', 'Exceptional']
    df['last_fico_range_high'] = pd.cut(
        df['last_fico_range_high'], bins=ranges, labels=labels, right=False)
    label_encoder = LabelEncoder()
    label_encoder.fit(labels)
    df['last_fico_range_high'] = label_encoder.transform(
        df['last_fico_range_high'])
    return df
