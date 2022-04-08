function timestamp() {
    const stampy = Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30);
    return new Date(stampy).toISOString();
}

export const routes = [
    {"route_name": "The Little Chockstone That Could", "grade": {"YDS": "V-easy", "Font": "3"}, "safety": "", "type": {"boulder": true}, "fa": "Jeff Hansen", "description": ["Go right and up on a trail that leads to an obvious crack.  It is V0 if hands only used in crack."], "location": ["It is up and right from", "Broken In", "."], "protection": ["A pad."], "metadata": {"left_right_seq": "4", "parent_lnglat": [-106.0501, 39.491], "parent_sector": "Raspberry Boulders", "mp_route_id": "108292642", "mp_sector_id": "108289128"}}

];

