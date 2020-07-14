import os
from flask import Flask, url_for, render_template, request, redirect
import pandas
import numpy as np

app = Flask('Flask Pokedex')
pokemonData= pandas.read_csv('pokeData.csv')

#The landing page
@app.route('/', methods = ['GET'])
def LandingPage():
    return render_template('Landing.html')

#The main page, an interface to view and query pokemon data
@app.route('/dex')
def PokedexPage():
    return render_template('Pokedex_browser.html')

#When requested this endpoint returns pokedemon data as JSON.
#It can take two arguments in the http header, gens and types, to allow for a more refined query.
@app.route('/poke')
def DexREST():
    querydf = pokemonData.copy()
    #By default the query object has the data for all pokemon.
    #However, it then drops the data of pokemon that are not of one of the generations and types supplied
    queryGens = request.args.get('gens', type=str, default='')
    if queryGens != '':
        queryGens = queryGens.split(',')
        for i in range(len(queryGens)):
            queryGens[i] = int(queryGens[i])
        querydf.drop(querydf[~querydf['Generation'].isin(queryGens)].index, inplace=True)
    queryTypes = request.args.get('types', type=str, default='')
    if queryTypes != '':
        queryTypes = queryTypes.split(',')
        querydf.drop((querydf[~(querydf['Type 1'].isin(queryTypes) | querydf['Type 2'].isin(queryTypes))]).index, inplace=True)
    return querydf.to_json()
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))