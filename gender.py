# This script is the gender detector. It basically opens a
# CSV file containing baby names registered with the U.S.
# Social Security office since 1950. It reads through the
# file and returns a dictionary with name, gender, ratio
# of the name that has been fed in to the function.

from os.path import join
import csv

folder = 'data'
babyfile = join(folder, 'wrangledbabynames.csv')

def detect_gender(name):
  with open(babyfile, 'r') as csv_in:
    for line in csv_in:
        temp = line.strip().split(',')
        result = {}

        #Check if name is there
        if name.lower() == temp[0].lower():
            #if yes, store results in result dict
            result = {'name': name, 
                      'gender': temp[1],
                      'ratio': temp[2],
                      'males': temp[4],
                      'females': temp[3],
                      'total': temp[5]}
            #append to master list and break out of loop
            return result

    #if nothing found, then append this to master list
    if not len(result):
        result = {'name': name, 
                      'gender': 'NA',
                      'ratio': None,
                      'males': None,
                      'females': None,
                      'total': 0}
        return result