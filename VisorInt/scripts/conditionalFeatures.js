function conditionalFeatures(feature) {
    return (
        conditions.GRCT.includes(feature.properties['GRCT']) ||
        conditions.ST_NAME.includes(feature.properties['ST_NAME'])
    );
}
