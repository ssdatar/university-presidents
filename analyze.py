# This script analyzes classified.csv to find the gender
# distribution of the presidents/chancellors of top US 
# universities. This data is used to build our vis

import csv
from os.path import join

folder = 'data'
thefile = join(folder, 'classified.csv')

presidents = {}

with open(thefile, 'r') as classified:
	reader = csv.reader(classified)
	next(reader)

	for row in reader:
		name,term,univ,gender = row
		
		if not presidents.get(univ):
			presidents[univ] = {'M':[], 'F': []}

		presidents[univ][gender].append({'name': name, 'term': term})

f_schools = []
m_schools = []

for school in presidents:
	if len(presidents[school]['F']) > 0:
		f_schools.append(school)
	else:
		m_schools.append(school)

with open('data/univ.csv', 'w') as univ:
	writer = csv.writer(univ)
	writer.writerow(['university','female_pres', 'count'])
	
	for s in f_schools:
		writer.writerow([s, 'y',len(presidents[s]['F'])])
	for p in m_schools:
		writer.writerow([p, 'n',0])