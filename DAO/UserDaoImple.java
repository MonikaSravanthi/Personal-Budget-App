package com.springlearning.budgetapp.DAO;

import com.springlearning.budgetapp.entity.Users;
import com.springlearning.budgetapp.repositories.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImple implements UserRepository {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    public UserDaoImple(EntityManager em) {
         this.em = em;
    }

 @Override
 public Users findUserById(int id) {
        return em.find(Users.class, id);

 }
    @Override
    public Users findByUsername(String username){
        TypedQuery<Users> query = em.createQuery("select u from Users u where u.username=:username",Users.class);
        query.setParameter("username", username);
       return query.getSingleResult();
    }

    @Override

    public List<Users> findAllUsers(){
        TypedQuery<Users> query = em.createQuery("select u from Users u", Users.class);
        return query.getResultList();
    }

    @Transactional
    public void save(Users user){
        em.persist(user);


    }
}
