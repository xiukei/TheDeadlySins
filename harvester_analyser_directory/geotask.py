from shapely.geometry import Polygon, Point
import shapefile


#------------SA4 list------------
sf = shapefile.Reader("SA4_2016_AUST_folder/SA4_2016_AUST")
records = sf.records() #info of areas
shapes = sf.shapes() #shape of areas

polygons_list = [] #list of polygon
for i,sp in enumerate(shapes):
    poly = Polygon(sp.points) #a Polygon
    polygons_list.append(poly)

SA4_list = []
for j,rcd in enumerate(records):
    info = rcd.as_dict() #a dictionary: {'SA4_CODE': '205', 'SA4_CODE16': '205', 'SA4_NAME': 'Latrobe - Gippsland', 'STATE_CODE': '2', 'STATE_NAME': 'Victoria', 'AREA_SQKM': 41553.7517}
    info['polygon'] = polygons_list[j]
    SA4_list.append(info)

del SA4_list[27] #remove SA4 area 901 (SA4_list[27])
#------------SA4 list end------------

def geo_analyser(data_dic):
    if (data_dic['geo'] is not None): #execute when a tweet has a point coordinate
        point = Point(data_dic['geo']['coordinates'][1],data_dic['geo']['coordinates'][0])
        for area in SA4_list:
            if point.within(area['polygon']): #execute when the point is in a SA4 area
                data_dic['SA4_CODE'] = area['SA4_CODE']
                data_dic['SA4_NAME'] = area['SA4_NAME']
                data_dic['STATE_CODE'] = area['STATE_CODE']
                data_dic['STATE_NAME'] = area['STATE_NAME']
                break
        else: #execute when the point is not in any SA4 area
            data_dic['SA4_CODE'] = "no_values"
            data_dic['SA4_NAME'] = "no_values"
            data_dic['STATE_CODE'] = "no_values"
            data_dic['STATE_NAME'] = "no_values"
    else: #execute when a tweet has no point coordinate (but has a bounding box)
        box = data_dic['place']['bounding_box']['coordinates'][0] #list of coordinates

        ctr = Polygon(box).centroid
        for area in SA4_list:
            if ctr.within(area['polygon']): #execute when the centroid in a SA4 area
                data_dic['SA4_CODE'] = area['SA4_CODE']
                data_dic['SA4_NAME'] = area['SA4_NAME']
                data_dic['STATE_CODE'] = area['STATE_CODE']
                data_dic['STATE_NAME'] = area['STATE_NAME']
                break
        else: #execute when the centroid is not in any SA4 area
            data_dic['SA4_CODE'] = "no_values"
            data_dic['SA4_NAME'] = "no_values"
            data_dic['STATE_CODE'] = "no_values"
            data_dic['STATE_NAME'] = "no_values"
