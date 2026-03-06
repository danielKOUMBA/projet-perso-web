def test_login(client):
    res=client.post('/api/login',json={
        'email':'admin@example.com',
        'password':'admin'
    })

    assert res.status_code==200
    assert res.json=={'erreur':'Action non Authentifier'}