def test_modifier_password(client):
    res=client.post('/api/update_password',json={
        'email':'admin@example.com',
        'OldPassword':'123',
        'new_password':'abc'
    })

    assert res.status_code==200
    assert res.json=={'erreur':'Mots de passe incorrect'}