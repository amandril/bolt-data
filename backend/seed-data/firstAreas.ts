function timestamp() {
    const stampy = Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
    return new Date(stampy).toISOString();
}

export const areas = [
    {"area_name": "Chicken Wall", "us_state": "Colorado", "url": "https://www.mountainproject.com/area/105811385/chicken-wall", "lnglat": [-105.4631, 39.97234], "metadata": {"lnglat_from_parent": false}}
];

