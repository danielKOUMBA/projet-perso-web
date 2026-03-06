# from app.extension import es

# INDEX_NAME='commande'

# def create_index():
#     mappings={
#         'mappings':{
#             'properties':{
#                 'nom':{'type':'text'},
#                 'numero':{'type':'integer'},
#                 'produit':{'type':'text'},
#                 'prix_avancer':{'type':'integer'},
#                 'prix_total':{'type':'integer'},
#                 'statut':{'type':'keyword'},
#                 'date':{'type':'date'},
#                 'type':{'type':'keyword'}
#             }
#         }
#     }
# #  je verifie si l'index n'existe pas deja sinn je cree un autre
#     if not es.indices.exists(INDEX_NAME):
#         es.indices.create(index=INDEX_NAME,body=mappings)
# # fonction pour cree le client
# def set_commande(doc):
#     return es.index(index=INDEX_NAME,document=doc)

# # fonction de recherches d'un client
# def search_commande(query_search):
    

#     return es.search(index=INDEX_NAME,query=
#                      {    
#             'multi_match':{
#                 'query':query_search,
#                 'fields':['nom','produit'],
#                 'fuzziness':'AUTO'
#             }
#                      }
#         )

# def delete_commande(es_id):
#     return es.delete(index=INDEX_NAME,id=es_id)