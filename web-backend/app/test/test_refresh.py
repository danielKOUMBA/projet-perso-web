def refresh(client):
    res=client.post('/api/refresh')

    assert res.status_code==200
    assert res.json['message']=='token recu avec succes'